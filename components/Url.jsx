function Url({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="link">{children}</a>
}

export default Url