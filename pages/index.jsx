import { motion } from 'framer-motion';
import Image from 'next/image';
import VideoScrubber from '../components/VideoScrubber';

function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute inset-0 w-full min-h-[80px] h-full z-[1] pointer-events-none rounded-full"
        style={{
          mixBlendMode: 'overlay',
          filter: 'blur(5px)',
        }}
      >
        <Image
          src="/deco/peanut.JPG"
          alt="peanut"
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="flex justify-center items-center relative">
        {/* sparkles */}
        <Image
          src="/deco/Vector 1.png"
          alt="vector"
          width={100}
          height={100}
          className="absolute bottom-[48%] right-[15%]"
        />
        <Image
          src="/deco/Vector 4.png"
          alt="vector"
          width={200}
          height={100}
          className="absolute top-[10%] right-[60%]"
        />
        <Image
          src="/deco/Vector 6.png"
          alt="vector"
          width={200}
          height={100}
          className="absolute bottom-[20%] left-[50%]"
        />

        <VideoScrubber
          src="/deco/turn.mp4"
          alt="me in 3d"
          width={500}
          height={500}
          className="object-cover h-[60vh] w-[25vh]"
        />
      </div>
    </>
  );
}

export default Home;
