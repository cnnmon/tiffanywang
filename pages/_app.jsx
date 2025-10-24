import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import WaveText from '../components/WaveText';
import '../styles/globals.css';
import markdownPreloader from '../utils/markdownPreloader';

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

    // Preload all markdown content on app start
    markdownPreloader.preloadAll().catch(console.error);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <MouseContext.Provider value={mousePosition}>
      <div className="flex flex-col w-full h-screen">
        <Head>
          <title>tiffanywang</title>
        </Head>
        <div className="flex justify-center py-10 h-full w-full">
          <div className="max-w-2xl w-full relative p-10 flex flex-col gap-8">
            <header className="flex justify-between">
              <Link href="/" className="text-xl">
                <WaveText text="tiffanywang⊹" />
              </Link>
              <div className="flex gap-4">
                <Link href="/about">about</Link>
                <Link href="/projects">projects</Link>
                <Link href="/shop">shop</Link>
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
