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
        className="absolute bottom-[48%] right-[15%] z-[2]"
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
        className="absolute top-[10%] right-[60%] z-[2]"
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
        className="absolute bottom-[20%] left-[50%] z-[2]"
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

      {/* Sunset gradient with bloom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
        className="absolute z-[1] mix-blend-overlay pointer-events-none"
      >
        {/* Bloom layers */}
        <div
          style={{
            width: 350,
            height: 350,
            opacity: 0.7,
            background:
              'radial-gradient(circle at center,rgb(237, 162, 57) 0%,rgb(235, 178, 161) 25%,rgb(247, 199, 233) 50%, #B88FD9 75%, rgba(77, 8, 133, 0) 100%)',
            filter: 'blur(40px)',
          }}
          className="rounded-full absolute"
        />
        <div
          style={{
            width: 350,
            height: 350,
            opacity: 0.5,
            background: 'radial-gradient(circle at center,rgb(216, 99, 99) 100%)',
            filter: 'blur(20px)',
          }}
          className="rounded-full absolute"
        />
        <div
          style={{
            width: 350,
            height: 350,
            opacity: 0.7,
            background:
              'radial-gradient(circle at center,rgb(235, 171, 107) 0%,rgb(165, 91, 159) 25%,rgb(106, 153, 180) 50%, #B88FD9 75%, rgba(97, 15, 164, 0) 100%)',
          }}
          className="rounded-full"
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
