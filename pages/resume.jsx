import { useState } from 'react'

function Resume() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      ｡･:*:･ﾟ★,｡･:*:･ﾟ☆
      <div className="mb-4">
        { isLoading ? <p>Loading... 🔎</p> : <p>In all its black-and-white glory; made with <a href="https://ezcv.pro/." target="_blank" rel="noreferrer" className="link">ezcv.pro</a>.</p> }
      </div>
      <iframe src="https://drive.google.com/file/d/1eLelGRhX6h65sQhYiB_LqCli2UL2U-wW/preview" width="640" height="850" allow="autoplay" onLoad={() => setIsLoading(false)} />
    </>
  );
}

export default Resume
