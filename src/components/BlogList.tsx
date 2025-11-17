import { Link } from 'react-router-dom'
import { BlogPostMetadata } from '../types/blog'

interface BlogListProps {
  posts: BlogPostMetadata[]
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-12 font-mono">
        Blog Posts
      </h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
          >
            <Link to={`/blog/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 font-mono hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 font-mono">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-800 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 font-mono">
              {post.excerpt}
            </p>
            
            <Link 
              to={`/blog/${post.slug}`}
              className="text-blue-400 hover:text-blue-300 font-mono text-sm"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogList
