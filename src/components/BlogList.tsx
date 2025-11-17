import { Link } from 'react-router-dom'
import { BlogPost } from '../types/blog'

interface BlogListProps {
  posts: BlogPost[]
}

function BlogList({ posts }: BlogListProps): React.ReactElement {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono">
        Blog Posts
      </h1>
      <p className="text-gray-400 font-mono mb-12">
        Thoughts, tutorials, and experiences in software engineering
      </p>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="border border-gray-700 rounded-lg p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            <Link to={`/blog/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 font-mono hover:text-purple-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4 font-mono">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="text-gray-600">•</span>
              <span>{calculateReadingTime(post.content)} min read</span>
              {post.tags.length > 0 && (
                <>
                  <span className="text-gray-600">•</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <p className="text-gray-300 mb-4 font-mono leading-relaxed">
              {post.excerpt}
            </p>
            
            <Link 
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-mono text-sm transition-colors group"
            >
              Read more 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogList
