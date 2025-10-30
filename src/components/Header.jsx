function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-100 font-mono">
            /
          </div>
          <ul className="flex gap-6 font-mono">
            <li>
              <a href="#" className="text-gray-300 hover:text-gray-100 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-gray-100 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-gray-100 transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
