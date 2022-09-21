import Link from 'next/link';

function Navbar({ active }) {
  function NavItem({ path, title }) {
    return (
      <Link href={path}>
        <a className={path === active ? "active" : "inactive"}>
          {title}
        </a>
      </Link>
    );
  }

  return (
    <div className="center" style={{ fontSize: 18 }}>
      <div className="container">
        <NavItem path="/" title="TIFFANYWANG" />
        <div style={{ float: 'right' }}>
          <NavItem path="/about" title="ABOUT" />
          {'  '}
          <NavItem path="/work" title="WORK" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;