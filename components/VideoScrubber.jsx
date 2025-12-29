import { useCallback, useEffect, useRef, useState } from 'react';
import { useMousePosition } from '../pages/_app';

function VideoScrubber({
  src,
  width,
  height,
  className,
  showTooltip,
  hideTooltip,
  speed = 1.5,
  scale = 1,
  ...props
}) {
  const [isHovering, setIsHovering] = useState(false);
  const hoverStartTimeRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);
  const frameBufferRef = useRef([]);
  const bufferStartTimeRef = useRef(0);
  const bufferEndTimeRef = useRef(0);
  const currentFrameIndexRef = useRef(0);
  const mousePosition = useMousePosition();

  // Pre-load frames around a time position
  const preloadFrameBuffer = useCallback(async (centerTime) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const bufferDuration = 10; // 3 seconds buffer (1.5s before, 1.5s after)
    const frameRate = 60; // Assume 30fps for buffer
    const totalFrames = bufferDuration * frameRate;

    // Handle looping by creating a circular buffer
    let startTime = centerTime - bufferDuration / 2;
    let endTime = centerTime + bufferDuration / 2;

    // Create frame buffer with time positions, handling looping
    const frameBuffer = [];
    const frameStep = bufferDuration / totalFrames;

    for (let i = 0; i < totalFrames; i++) {
      let frameTime = startTime + i * frameStep;

      // Handle looping at video boundaries
      if (frameTime < 0) {
        frameTime = video.duration + frameTime; // Wrap to end
      } else if (frameTime >= video.duration) {
        frameTime = frameTime - video.duration; // Wrap to beginning
      }

      frameBuffer.push(frameTime);
    }

    frameBufferRef.current = frameBuffer;
    bufferStartTimeRef.current = startTime;
    bufferEndTimeRef.current = endTime;

    // Set initial frame index to center
    const centerIndex = Math.floor(totalFrames / 2);
    currentFrameIndexRef.current = centerIndex;

    // Pre-seek to center frame to start buffering
    video.currentTime = centerTime;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      hoverStartTimeRef.current = currentTime;
      lastMouseXRef.current = mousePosition?.x || 0;
      videoRef.current.pause();

      // Pre-load frame buffer around current position
      preloadFrameBuffer(currentTime);
    }
  }, [mousePosition, preloadFrameBuffer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (videoRef.current) {
      // Ensure we're at a valid position before resuming play
      const video = videoRef.current;
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0; // Reset to beginning if near end
      }
      video.play();
    }
  }, []);

  const navigateFrameBuffer = useCallback(
    (direction) => {
      const video = videoRef.current;
      const frameBuffer = frameBufferRef.current;

      if (!video || !isHovering || frameBuffer.length === 0) return;

      // Move through buffer at 2x speed (2 frames per call)
      const frameStep = direction * 2;
      let newIndex = currentFrameIndexRef.current + frameStep;

      // Handle circular buffer - wrap around at boundaries
      if (newIndex < 0) {
        newIndex = frameBuffer.length + newIndex; // Wrap to end
      } else if (newIndex >= frameBuffer.length) {
        newIndex = newIndex - frameBuffer.length; // Wrap to beginning
      }

      if (newIndex !== currentFrameIndexRef.current) {
        currentFrameIndexRef.current = newIndex;
        const targetTime = frameBuffer[newIndex];

        // Ensure target time is valid
        const clampedTime = Math.max(0, Math.min(video.duration - 0.001, targetTime));

        // Direct seek - much faster than animation
        video.currentTime = clampedTime;
      }
    },
    [isHovering],
  );

  const updateVideoTime = useCallback(() => {
    const video = videoRef.current;
    const frameBuffer = frameBufferRef.current;

    if (!video || !video.duration || !mousePosition || frameBuffer.length === 0) return;

    // Calculate mouse movement direction and speed
    const currentMouseX = mousePosition.x;
    const lastMouseX = lastMouseXRef.current;
    const mouseDelta = currentMouseX - lastMouseX;
    lastMouseXRef.current = currentMouseX;

    // Determine direction based on mouse movement
    if (Math.abs(mouseDelta) > 2) {
      // Only move if significant mouse movement
      const direction = mouseDelta > 0 ? 1 : -1;
      navigateFrameBuffer(direction);
    }
  }, [navigateFrameBuffer, mousePosition]);

  useEffect(() => {
    if (!isHovering || !mousePosition || !videoRef.current) return;

    updateVideoTime();
  }, [mousePosition, isHovering, updateVideoTime]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      src={src}
      width={width}
      height={height}
      className={className}
      style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease' }}
      onMouseEnter={() => {
        showTooltip('wheeee', true);
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        hideTooltip();
        handleMouseLeave();
      }}
      {...props}
    />
  );
}

export default VideoScrubber;
