import '../styles/globals.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { pages } from '../utils/constants'
import { motion, AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const activePathIndex = pages.findIndex(page => page.path === router.pathname)

  function NavItem({ path, title }) {
    const activePath = pages[activePathIndex]
    const isActive = activePath && activePath.path === path

    return (
      <Link href={path} style={{ color: isActive ? undefined: 'rgba(0, 0, 0, 0.3)' }}>
        {title}
      </Link>
    )
  }

  return (
    <div className="flex flex-col w-full gap-8 p-4">
      <Head>
        <title>tiffanywang</title>
      </Head>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: -1 }}>
        <Image src="/cabbage.png" width={500} height={500} alt="cabbage background" className="w-full max-w-2xl opacity-50" />
      </div>
      <div className="flex gap-5 md:flex-row">
        <nav className="flex flex-col md:w-1/7 text-right ">
          {pages.map((page, index) => <NavItem key={index} path={page.path} title={page.title} />)}
        </nav>
        <div className="w-full max-w-2xl body">
          <AnimatePresence exitBeforeEnter mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
          <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-sm">
            <p>•───────• built with <a className="link" href="https://github.com/cnnmon/tiffanywang"><b>˙ᵕ˙</b></a> •───────•</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default MyApp
