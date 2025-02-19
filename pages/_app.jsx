import '../styles/globals.css'
import logo from '../public/logo.svg'
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
    <div className="flex flex-col justify-center w-full md:max-w-3xl mx-auto gap-8 mt-[8vh] p-4">
      <Head>
        <title>tiffanywang</title>
      </Head>
      <Image src={logo} alt="logo" className="w-[150px] md:w-1/5 px-6" />
      <div className="flex flex-row gap-5 md:flex-row flex-col">
        <nav className="flex md:w-1/7 md:flex-col gap-2 text-right text-lg">
          {pages.map((page, index) => <NavItem key={index} path={page.path} title={page.title} />)}
        </nav>
        <div className="md:w-4/5 body">
          <AnimatePresence exitBeforeEnter mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
          <footer className="p-4 text-center text-sm">
            <p>•───────• Built with <a className="link" href="https://github.com/cnnmon/tiffanywang"><b>˙ᵕ˙</b></a> •───────•</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default MyApp
