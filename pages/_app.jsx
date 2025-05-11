import '../styles/globals.css'
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
    <div className="flex flex-col gap-8 h-[calc(100vh-4px)] p-4 justify-center">
      <Head>
        <title>tiffanywang</title>
      </Head>
      <div className="h-full overflow-y-scroll w-full bg-[#D9D9D9] p-9">
        <div className="sky fixed inset-0 opacity-90 z-[1] pointer-events-none" style={{
          mixBlendMode: 'lighten',
        }} />
        <div className="flex flex-col sm:flex-row gap-5">
          <nav className="flex flex-row gap-2 sm:flex-col text-2xl">
            {pages.map((page, index) => <NavItem key={index} path={page.path} title={page.title} />)}
          </nav>
          <div className="w-full body z-[1] max-w-xl">
            <AnimatePresence exitBeforeEnter mode="wait">
              <div
                key={router.route}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Component {...pageProps} />
              </div>
            </AnimatePresence>
          </div>
        </div>
        <footer className="text-center text-sm">
          <p>•────• built with <a className="link" href="https://github.com/cnnmon/tiffanywang"><b>˙ᵕ˙</b></a> •────•</p>
        </footer>
      </div>
    </div>
  )
}

export default MyApp
