import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WaveText from '../components/WaveText';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-screen">
      <Head>
        <title>tiffanywang</title>
      </Head>
      <div>
        <div className="max-w-2xl relative p-10 flex flex-col gap-8">
          <header className="flex justify-between">
            <Link href="/" className="text-xl">
              <WaveText text="tiffanywang . ݁₊ ⊹ . ݁˖ . ݁" />
            </Link>
            <div className="flex gap-4">
              <Link href="/about">about</Link>
              <Link href="/projects">projects</Link>
            </div>
          </header>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="pb-20"
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>

          <div
            className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #eae9ec)' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
