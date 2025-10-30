import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import WaveText from '../components/WaveText';
import '../styles/globals.css';

const MouseContext = createContext();

export const useMousePosition = () => useContext(MouseContext);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <MouseContext.Provider value={mousePosition}>
      <div className="flex flex-col w-full h-screen">
        <Head>
          <title>tiffanywang</title>
        </Head>

        {router.route === '/' && (
          <div
            className="fixed inset-0 w-full min-h-[80px] z-[1] h-full pointer-events-none rounded-full opacity-50"
            style={{
              mixBlendMode: 'multiply',
            }}
          >
            <Image
              src="/deco/peanut.JPG"
              alt="peanut"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex justify-center py-10 h-full w-full">
          <div className="w-full max-w-2xl relative p-10 flex flex-col gap-8">
            <header className="flex justify-between z-[2]">
              <Link href="/" className="text-xl">
                <WaveText text="tiffanywang⊹" className="text-3xl" />
              </Link>
              <div className="flex gap-4">
                <Link href="/about">about</Link>
                <Link href="/projects">projects</Link>
                <Link href="/files">files</Link>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <div key={router.route} className="pb-20">
                <Component {...pageProps} />
              </div>
            </AnimatePresence>

            <div
              className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, #E2DDE6)' }}
            ></div>
          </div>
        </div>
      </div>
    </MouseContext.Provider>
  );
}

export default MyApp;
