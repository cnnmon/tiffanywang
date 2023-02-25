import '../styles/globals.css'
import logo from '../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { pages } from '../utils/constants'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const activePathIndex = pages.findIndex(page => page.path === router.pathname)

  function NavItem({ path, title }) {
    const activePath = pages[activePathIndex]
    const isActive = activePath && activePath.path === path

    return (
      <Link href={path} style={{ color: isActive ? undefined: 'rgba(0, 0, 0, 0.3)' }}>
        <span className="hidden md:inline"  style={{ color: isActive ? activePath.color : undefined }}>
          {isActive && '> '}
        </span>
        {title}
      </Link>
    )
  }

  return (
    <div className="flex flex-col justify-center w-full md:max-w-3xl mx-auto gap-8 mt-[10vh] p-4">
      <Head>
        <title>tiffanywang</title>
      </Head>
      <Image src={logo} alt="logo" className="w-[150px] md:w-1/5 px-6" />
      <div className="flex md:flex-row flex-col">
        <nav className="flex md:w-1/5 p-3 md:flex-col gap-2 text-right">
          {pages.map((page, index) => <NavItem key={index} path={page.path} title={page.title} />)}
        </nav>
        <div className="md:w-4/5 p-3 body">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
