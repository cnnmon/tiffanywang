import { motion } from 'framer-motion';
import Image from 'next/image';
import VideoScrubber from '../components/VideoScrubber';

function Home() {
  return (
    <div className="flex justify-center items-center relative">
      {/* sparkles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="absolute bottom-[48%] right-[15%]"
      >
        <Image
          src="/deco/Vector 1.png"
          alt="vector"
          width={100}
          height={100}
          loading="eager"
          className="pointer-events-none"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="absolute top-[10%] right-[60%]"
      >
        <Image
          src="/deco/Vector 4.png"
          alt="vector"
          width={200}
          height={100}
          loading="eager"
          className="pointer-events-none"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="absolute bottom-[20%] left-[50%]"
      >
        <Image
          src="/deco/Vector 6.png"
          alt="vector"
          width={200}
          height={100}
          loading="eager"
          className="pointer-events-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <VideoScrubber
          src="/deco/turn.mp4"
          alt="me in 3d"
          width={500}
          height={500}
          className="object-cover h-[60vh] w-[25vh]"
        />
      </motion.div>
    </div>
  );
}

export default Home;
