import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-100 font-mono hover:text-purple-400 transition-colors">
            /home
          </Link>
          <ul className="flex gap-6 font-mono">
            <li>
              <Link to="/about" className="px-4 py-2 text-gray-300 hover:text-gray-100 transition-all duration-300 inline-block hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="px-4 py-2 text-gray-300 hover:text-gray-100 transition-all duration-300 inline-block hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
