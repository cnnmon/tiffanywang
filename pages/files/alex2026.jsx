import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import MarkdownFormatter from '../../components/MarkdownFormatter';
import WaveText from '../../components/WaveText';

const SCALE = 1.4;
const W = 340 * SCALE;
const H = 460 * SCALE;
const EASE = [0.4, 0, 0.2, 1];
const DUR = 0.9;

function Alex2026() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position normalized to [-0.5, 0.5] relative to the viewport
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const sceneRef = useRef(null);

  // Shimmer derived from springs so it animates back smoothly on mouse leave
  const shimmerX = useTransform(rotateY, [-12, 12], [-0.5, 0.5]);
  const shimmerY = useTransform(rotateX, [12, -12], [-0.5, 0.5]);

  const rainbow = useTransform([shimmerX, shimmerY], ([x, y]) => {
    const angle = 115 + x * 200;
    const hue = (x + 0.5) * 360;
    return `linear-gradient(${angle}deg,
      hsl(${hue}deg 100% 50%) 0%,
      hsl(${hue + 60}deg 100% 50%) 16%,
      hsl(${hue + 120}deg 100% 50%) 33%,
      hsl(${hue + 180}deg 100% 50%) 50%,
      hsl(${hue + 240}deg 100% 50%) 66%,
      hsl(${hue + 300}deg 100% 50%) 83%,
      hsl(${hue + 360}deg 100% 50%) 100%)`;
  });

  const glare = useTransform([shimmerX, shimmerY], ([x, y]) => {
    const px = (x + 0.5) * 100;
    const py = (y + 0.5) * 100;
    return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 28%, transparent 80%)`;
  });

  function onMouseMove(e) {
    if (!sceneRef.current) return;
    if (!isHovering) setIsHovering(true);
    const { left, top, width, height } = sceneRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left - width / 2) / width);
    mouseY.set((e.clientY - top - height / 2) / height);
  }

  function handleOpen() {
    mouseX.set(0);
    mouseY.set(0);
    setIsOpen(true);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div style={{ perspective: 1400 }}>
        <div className="relative" style={{ width: W * 2, height: H }}>
          {/*
            Scene is always 2×W wide.
            When closed, shift left by W/2 so the right-half cover is centered.
            When open, shift back to 0 so both halves are centered.
            rotateX/rotateY: whole-card 3D tilt from mouse, resets to 0 on open.
          */}
          <motion.div
            ref={sceneRef}
            onMouseMove={onMouseMove}
            onMouseLeave={() => {
              setIsHovering(false);
              mouseX.set(0);
              mouseY.set(0);
            }}
            style={{
              position: 'relative',
              width: W * 2,
              height: H,
              transformStyle: 'preserve-3d',
              rotateX: isOpen ? 0 : rotateX,
              rotateY: isOpen ? 0 : rotateY,
            }}
            animate={{ x: isOpen ? 0 : -(W / 2) }}
            transition={{ duration: DUR, ease: EASE }}
          >
            {/* Inside panel — right half, always present behind the cover */}
            <div
              style={{ position: 'absolute', left: W, top: 0, width: W, height: H }}
              className="bg-[#f8f5fc] border-[1px] border-[#c6bae3] flex flex-col p-6 gap-4"
            >
              <WaveText
                text="happy happy happy birthday alex!!!"
                className="text-2xl"
                gradient={false}
              />
              <div className="flex-1 text-left overflow-y-auto">
                <MarkdownFormatter file="/text/special/alex2026/index.md" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 text-xs hover:text-gray-600 text-left"
              >
                ↩ close
              </button>
            </div>

            {/* Cover — right half, rotates around the spine (left edge) on click */}
            <motion.div
              style={{
                position: 'absolute',
                left: W,
                top: 0,
                width: W,
                height: H,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                cursor: isOpen ? 'default' : 'pointer',
              }}
              animate={{ rotateY: isOpen ? -180 : 0 }}
              transition={{ duration: DUR, ease: EASE }}
              onClick={() => !isOpen && handleOpen()}
            >
              {/* Front face */}
              <div
                className="absolute inset-0 border-[1px] border-[#c6bae3] overflow-hidden"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <Image
                  src="/text/special/alex2026/image.png"
                  alt="happy birthday alex"
                  fill
                  className="object-cover"
                  priority
                  onLoadingComplete={() => setCoverLoaded(true)}
                />

                {/* Holographic rainbow foil */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: rainbow, mixBlendMode: 'color-dodge' }}
                  animate={{ opacity: isHovering && !isOpen ? 0.15 : 0 }}
                  transition={{ duration: 0.25 }}
                />
                {/* Specular glare */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: glare, mixBlendMode: 'overlay' }}
                  animate={{ opacity: isHovering && !isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                />

                <motion.div
                  className="absolute inset-0 flex items-end justify-center pb-5 bg-gradient-to-t from-black/30 to-transparent"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white/80 text-sm select-none">click to open →</span>
                </motion.div>
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 bg-[#f8f5fc] border-[1px] border-[#c6bae3]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="justify-between flex flex-col h-full items-end p-8">
                  <Image
                    src="/text/special/alex2026/inner_pigeon.png"
                    alt="inner card art"
                    width={W / 3}
                    height={H}
                    className="object-cover"
                  />
                  <Image
                    src="/text/special/alex2026/inner_poo.png"
                    alt="inner card art"
                    width={W / 6}
                    height={H}
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-[2] bg-black pointer-events-none"
            animate={{ opacity: coverLoaded ? 0 : 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

Alex2026.getLayout = (page) => <div className="w-screen h-screen bg-black">{page}</div>;

export default Alex2026;
