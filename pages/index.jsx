import VideoScrubber from '../components/VideoScrubber';

function Home() {
  return (
    <div className="flex justify-center items-center relative">
      <div className="">
        <VideoScrubber
          src="/deco/turn.mp4"
          alt="me in 3d"
          width={500}
          height={500}
          className="object-cover h-[60vh] w-[25vh]"
        />
      </div>
    </div>
  );
}

export default Home;
