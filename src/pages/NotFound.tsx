import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NotFound(): React.ReactElement {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman | 404'
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-purple-500 font-mono mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-100 font-mono mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-300 font-mono mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600/20 border border-purple-500/50 text-purple-300 font-mono rounded hover:bg-purple-600/30 hover:text-purple-200 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
