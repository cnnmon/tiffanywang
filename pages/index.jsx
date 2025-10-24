import Image from 'next/image';
import VideoScrubber from '../components/VideoScrubber';

function Home() {
  return (
    <div className="flex justify-center items-center relative">
      <Image
        src="/deco/peanut.JPG"
        alt="peanut"
        width={200}
        height={200}
        className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none"
        style={{
          mixBlendMode: 'overlay',
          opacity: 0.3,
          filter: 'blur(10px)',
        }}
      />

      {/* sparkles */}
      <Image
        src="/deco/Vector 1.png"
        alt="vector"
        width={100}
        height={100}
        className="absolute bottom-[40%] right-[15%]"
      />
      <Image
        src="/deco/Vector 4.png"
        alt="vector"
        width={200}
        height={100}
        className="absolute top-[10%] right-80"
      />
      <Image
        src="/deco/Vector 6.png"
        alt="vector"
        width={200}
        height={100}
        className="absolute bottom-20 left-80"
      />

      <VideoScrubber
        src="/deco/turn.mp4"
        alt="me in 3d"
        width={500}
        height={500}
        className="object-cover h-[60vh] w-[25vh]"
      />
    </div>
  );
}

export default Home;
