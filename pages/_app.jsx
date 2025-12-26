import { GoogleAnalytics } from '@next/third-parties/google';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
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

  // Use custom layout if page defines one
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <div className="flex flex-col w-full h-screen">
        <Head>
          <title>tiffanywang</title>
        </Head>

        <div className="flex justify-center py-10 h-full w-full">
          <div className="w-full max-w-2xl relative p-10 flex flex-col gap-8">
            <header className="flex justify-between z-[2]">
              <Link href="/" className="text-xl">
                <WaveText text="tiffanywang⊹" className="text-3xl" />
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/about"
                  className={twMerge(
                    'hover:opacity-100',
                    router.pathname === '/about' ? 'opacity-100' : 'opacity-60',
                  )}
                >
                  about
                </Link>
                <Link
                  href="/projects"
                  className={twMerge(
                    'hover:opacity-100',
                    router.pathname === '/projects' ? 'opacity-100' : 'opacity-60',
                  )}
                >
                  projects
                </Link>
                <Link
                  href="/files"
                  className={twMerge(
                    'hover:opacity-100',
                    router.pathname.startsWith('/files') ? 'opacity-100' : 'opacity-60',
                  )}
                >
                  files
                </Link>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <div key={router.route} className="pb-[200px]">
                {page}
              </div>
            </AnimatePresence>

            <div
              className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, #E2DDE6)' }}
            ></div>
          </div>
        </div>
      </div>
    ));

  return (
    <MouseContext.Provider value={mousePosition}>
      <GoogleAnalytics gaId="G-3GQCPVERX9" />
      {getLayout(<Component {...pageProps} />)}
    </MouseContext.Provider>
  );
}

export default MyApp;
