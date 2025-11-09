import { Link } from 'react-router-dom'

function Header(): React.ReactElement {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center justify-center w-10 h-10 transition-all duration-300 hover:[box-shadow:2px_2px_0_rgba(168,85,247,0.8),-2px_-2px_0_rgba(16,185,129,0.8)]">
            <img src="/favicon.svg" alt="Home" className="w-8 h-8" />
          </Link>
          <ul className="flex gap-6 font-mono">
            <li>
              <Link to="/about" className="px-4 py-2 text-gray-300 hover:text-gray-100 transition-all duration-300 inline-block hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
                /about
              </Link>
            </li>
            <li>
              <Link to="/blog" className="px-4 py-2 text-gray-300 hover:text-gray-100 transition-all duration-300 inline-block hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
                /blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
