import { useEffect } from 'react'

function Blog(): React.ReactElement {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman > Blog'
  }, [])
 
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl md:text-6xl font-bold text-gray-100 font-mono">
        🚧 Coming soon! 🚧
      </h1>
    </div>
  )
}

export default Blog
