import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import MarkdownFormatter from '../components/MarkdownFormatter';

function About() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/deco/me2.png"
              alt="tiffanywang"
              width={200}
              height={200}
              title="me 3d"
              className="h-40 w-40 object-cover overflow-hidden object-center pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>
        <p>📍 San Francisco, CA</p>
      </div>
      <MarkdownFormatter file="/text/about.md" />
      <div className="flex flex-col gap-2 text-gray-500">
        <p>
          Time travel to older versions of this website:{' '}
          <a href="https://tiffanywang-azqu4w7ti-cnnmons-projects.vercel.app">2023</a>{' '}
          <a href="https://tiffanywang-nddwqs5e6-cnnmon.vercel.app">2022</a>
        </p>
      </div>
    </div>
  );
}

export default About;
