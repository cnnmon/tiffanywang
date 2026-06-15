import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import MarkdownFormatter from '../../components/MarkdownFormatter';
import WaveText from '../../components/WaveText';

const BASE_W = 340;
const BASE_H = 460;
const MAX_SCALE = 1.4;
const MIN_W = 220;
const EASE = [0.4, 0, 0.2, 1];
const DUR = 0.9;

function Alex2026() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [viewport, setViewport] = useState({ width: 1200, height: 900 });

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

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const maxW = BASE_W * MAX_SCALE;
  const widthFromViewport = viewport.width * 0.88;
  const widthFromHeight = viewport.height * 0.78 * (BASE_W / BASE_H);
  const W = Math.max(MIN_W, Math.min(maxW, widthFromViewport, widthFromHeight));
  const H = (W / BASE_W) * BASE_H;

  // Shimmer derived from the tilt springs so it eases back on mouse leave
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

  function onMouseLeave() {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  function toggleCard() {
    mouseX.set(0);
    mouseY.set(0);
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div style={{ perspective: 1400 }}>
        <div className="relative" style={{ width: W, height: H }}>
          <motion.div
            ref={sceneRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              position: 'relative',
              width: W,
              height: H,
              transformStyle: 'preserve-3d',
              rotateX: isOpen ? 0 : rotateX,
              rotateY: isOpen ? 0 : rotateY,
            }}
          >
            <motion.button
              type="button"
              aria-label="Flip greeting card"
              onClick={toggleCard}
              className="absolute inset-0 cursor-pointer"
              style={{
                border: 'none',
                padding: 0,
                background: 'transparent',
                transformStyle: 'preserve-3d',
              }}
              animate={{ rotateY: isOpen ? 180 : 0 }}
              transition={{ duration: DUR, ease: EASE }}
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

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: rainbow, mixBlendMode: 'color-dodge' }}
                  animate={{ opacity: isHovering && !isOpen ? 0.15 : 0 }}
                  transition={{ duration: 0.25 }}
                />
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
                  <span className="text-white/80 text-sm select-none">tap to flip →</span>
                </motion.div>
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 bg-[#f8f5fc] border-[1px] border-[#c6bae3] p-5 flex flex-col gap-3"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <WaveText text="happy birthday alex!!!" className="text-2xl" gradient={false} />
                <div className="min-h-0 flex-1 text-left overflow-y-auto">
                  <MarkdownFormatter file="/text/special/alex2026/index.md" />
                </div>
                <div className="flex items-end justify-between gap-3">
                  <Image
                    src="/text/special/alex2026/inner_pigeon.png"
                    alt="inner pigeon"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                  <Image
                    src="/text/special/alex2026/inner_poo.png"
                    alt="inner doodle"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.button>
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
