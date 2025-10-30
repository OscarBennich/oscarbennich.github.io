import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  
  const getRoutePath = () => {
    if (location.pathname === '/') return '/home'
    return location.pathname
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-100 font-mono">
            {getRoutePath()}
          </div>
          <ul className="flex gap-6 font-mono">
            <li>
              <Link to="/" className="text-gray-300 hover:text-gray-100 transition-all duration-300 hover:[text-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-gray-100 transition-all duration-300 hover:[text-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-300 hover:text-gray-100 transition-all duration-300 hover:[text-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
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
