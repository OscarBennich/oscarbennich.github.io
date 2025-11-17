import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost as BlogPostType } from '../types/blog'

interface BlogPostProps {
  posts: BlogPostType[]
}

function BlogPost({ posts }: BlogPostProps): React.ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = posts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} > Oscar Bennich-Björkman`
    } else {
      document.title = 'Post Not Found > Oscar Bennich-Björkman'
    }
  }, [post])

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-6 font-mono">
          Post Not Found
        </h1>
        <p className="text-gray-300 mb-6 font-mono">
          Sorry, the blog post you're looking for doesn't exist.
        </p>
        <Link 
          to="/blog"
          className="text-blue-400 hover:text-blue-300 font-mono"
        >
          ← Back to Blog
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/blog')}
        className="text-blue-400 hover:text-blue-300 font-mono mb-8 flex items-center gap-2"
      >
        ← Back to Blog
      </button>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
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
      </header>

      <div className="prose prose-invert prose-lg max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({children}) => (
              <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mt-8 mb-4 font-mono">
                {children}
              </h1>
            ),
            h2: ({children}) => (
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mt-8 mb-4 font-mono">
                {children}
              </h2>
            ),
            h3: ({children}) => (
              <h3 className="text-xl md:text-2xl font-bold text-gray-100 mt-6 mb-3 font-mono">
                {children}
              </h3>
            ),
            p: ({children}) => (
              <p className="text-gray-300 mb-4 leading-relaxed font-mono">
                {children}
              </p>
            ),
            ul: ({children}) => (
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 font-mono">
                {children}
              </ul>
            ),
            ol: ({children}) => (
              <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2 font-mono">
                {children}
              </ol>
            ),
            li: ({children}) => (
              <li className="text-gray-300 font-mono">
                {children}
              </li>
            ),
            code: ({className, children}) => {
              const isInline = !className
              return isInline ? (
                <code className="bg-gray-800 text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ) : (
                <code className="block bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                  {children}
                </code>
              )
            },
            pre: ({children}) => (
              <pre className="mb-4">
                {children}
              </pre>
            ),
            a: ({href, children}) => (
              <a 
                href={href}
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 my-4 font-mono">
                {children}
              </blockquote>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default BlogPost
