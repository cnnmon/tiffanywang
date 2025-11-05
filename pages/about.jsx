import { motion } from 'framer-motion';
import Image from 'next/image';
import MarkdownFormatter from '../components/MarkdownFormatter';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4"
    >
      <Image
        src="/deco/me2.png"
        alt="tiffanywang"
        width={200}
        height={200}
        priority
        title="me 3d"
        className="h-40 w-40 object-cover overflow-hidden object-center pointer-events-none rotate-90"
      />
      <p>📍 San Francisco, CA</p>
      <MarkdownFormatter file="/text/about.md" />
    </motion.div>
  );
}

export default About;
