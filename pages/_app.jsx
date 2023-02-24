import '../styles/globals.css'
import logo from '../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  function NavItem({ path, title, name }) {
    const isActive = Component.name == name;

    // TODO: navigation styling for active link doesn't work on deployment
    return (
      <Link href={path} className={isActive ? 'font-bold text-cosmic' : ''}>
        <span className="hidden md:inline">
          {isActive && '> '}
        </span>
        {title}
      </Link>
    )
  }

  return (
    <div className="flex flex-col justify-center w-full md:max-w-3xl mx-auto gap-8 mt-[20vh] p-4">
      <Image src={logo} alt="logo" className="w-[150px] md:w-1/5 px-6" />
      <div className="flex md:flex-row flex-col">
        <nav className="flex md:w-1/5 p-3 md:flex-col gap-2 text-right">
          <NavItem path="/" title="home" name="Home" />
          <NavItem path="/about" title="about" name="About" />
          <NavItem path="/projects" title="projects" name="Projects" />
          <a href="https://drive.google.com/file/d/1eLelGRhX6h65sQhYiB_LqCli2UL2U-wW/view" target="_blank">resume</a>
        </nav>
        <div className="md:w-4/5 p-3 body">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
