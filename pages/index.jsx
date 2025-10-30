import Image from 'next/image';
import VideoScrubber from '../components/VideoScrubber';

function Home() {
  return (
    <>
      <div className="flex flex-col absolute opacity-50">
        <p>hi there!</p>
        <p>don't mind me</p>
      </div>

      <div className="flex justify-center items-center relative">
        {/* sparkles */}
        <Image
          src="/deco/Vector 1.png"
          alt="vector"
          width={100}
          height={100}
          className="absolute bottom-[48%] right-[15%] pointer-events-none"
        />
        <Image
          src="/deco/Vector 4.png"
          alt="vector"
          width={200}
          height={100}
          className="absolute top-[10%] right-[60%] pointer-events-none"
        />
        <Image
          src="/deco/Vector 6.png"
          alt="vector"
          width={200}
          height={100}
          className="absolute bottom-[20%] left-[50%] pointer-events-none"
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
