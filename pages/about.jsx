import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import MarkdownFormatter from '../components/MarkdownFormatter';

// [src, gazeX, gazeY, location] — 0,0 = top-left, 1,1 = bottom-right
const PICS = [
  ['/me/me_13.png', 0.05, 0.5, 'Berkeley, CA'],
  ['/me/me_2.png', 0.1, 0.35, 'San Francisco, CA'],
  ['/me/me_7.png', 0.1, 0.2, 'San Francisco, CA'],
  ['/me/me_19.png', 0.15, 0.5, 'New York, NY'],
  ['/me/me_5.png', 0.3, 0.15, 'San Francisco, CA'],
  ['/me/me_10.png', 0.3, 0.8, 'San Francisco, CA'],
  ['/me/me_12.png', 0.4, 0.5, 'Daly City, CA'],
  ['/me/me_11.png', 0.45, 0.45, 'San Francisco, CA'],
  ['/me/me_8.png', 0.5, 0.5, 'New York, NY'],
  ['/me/me_17.png', 0.5, 0.7, 'Tokyo, Japan'],
  ['/me/me_18.png', 0.8, 0.8, 'Tokyo, Japan'],
  ['/me/me_4.png', 0.5, 0.6, 'Queens, NY'],
  ['/me/me_3.png', 0.5, 0.65, 'Brecksville, OH'],
  ['/me/me_15.png', 0.55, 0.45, 'Kamakura, Japan'],
  ['/me/me_6.png', 0.55, 0.1, 'San Francisco, CA'],
  ['/me/me_16.png', 0.7, 0.5, 'San Francisco, CA'],
  ['/me/me_9.png', 0.75, 0.4, 'San Francisco, CA'],
  ['/me/me_1.png', 0.9, 0.1, 'Kamakura, Japan'],
];

const DEFAULT_INDEX = PICS.findIndex(([src]) => src === '/me/me_1.png');

function nearest(nx, ny) {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < PICS.length; i++) {
    const dx = nx - PICS[i][1];
    const dy = ny - PICS[i][2];
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

function About() {
  const [picIndex, setPicIndex] = useState(DEFAULT_INDEX);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setPicIndex(nearest(nx, ny));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <div
          ref={containerRef}
          onMouseEnter={() => setHovering(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setPicIndex(DEFAULT_INDEX); setHovering(false); }}
          className="h-40 w-40 overflow-hidden cursor-crosshair"
        >
          <Image
            src={PICS[picIndex][0]}
            alt="tiffanywang"
            width={200}
            height={200}
            priority
            title="me"
            className="h-40 w-40 object-cover object-center pointer-events-none"
          />
        </div>
        <p>📍 {hovering ? PICS[picIndex][3] : 'San Francisco, CA'}</p>
      </div>
      <MarkdownFormatter file="/text/about.md" />
    </motion.div>
  );
}

export default About;
