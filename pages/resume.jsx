import { useState } from 'react'
import Url from '../components/Url'

function Resume() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <div className="mb-4">
        { isLoading ? <p>Loading... 🔎</p> : <p>In all its black-and-white glory. Made with <Url href="https://ezcv.pro/.">ezcv</Url>.</p> }
      </div>
      <iframe src="https://drive.google.com/file/d/1eLelGRhX6h65sQhYiB_LqCli2UL2U-wW/preview" width="640" height="850" allow="autoplay" onLoad={() => setIsLoading(false)} />
    </>
  );
}

export default Resume
