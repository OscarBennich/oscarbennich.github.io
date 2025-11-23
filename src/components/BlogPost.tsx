import { useEffect, useState, useMemo, memo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { BlogPost as BlogPostType } from '../types/blog'
import { blogPostsMetadata, loadBlogPost } from '../data/blogPosts'

const MemoizedSyntaxHighlighter = memo(SyntaxHighlighter)

function BlogPost(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)

  const markdownComponents = useMemo(() => ({
    h1: ({children}: {children?: React.ReactNode}) => (
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4 font-mono">
        {children}
      </h1>
    ),
    h2: ({children}: {children?: React.ReactNode}) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mt-8 mb-4 font-mono">
        {children}
      </h2>
    ),
    h3: ({children}: {children?: React.ReactNode}) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-100 mt-6 mb-3 font-mono">
        {children}
      </h3>
    ),
    p: ({children}: {children?: React.ReactNode}) => (
      <p className="text-gray-300 mb-4 leading-relaxed font-mono">
        {children}
      </p>
    ),
    ul: ({children}: {children?: React.ReactNode}) => (
      <ul className="list-disc list-outside ml-6 text-gray-300 mb-4 space-y-2 font-mono">
        {children}
      </ul>
    ),
    ol: ({children}: {children?: React.ReactNode}) => (
      <ol className="list-decimal list-outside ml-6 text-gray-300 mb-4 space-y-2 font-mono">
        {children}
      </ol>
    ),
    li: ({children}: {children?: React.ReactNode}) => (
      <li className="text-gray-300 font-mono ml-2">
        {children}
      </li>
    ),
    code: ({className, children}: {className?: string, children?: React.ReactNode}) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      const isInline = !className

      return isInline ? (
        <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <div className="my-4 rounded-lg overflow-hidden border border-gray-700">
          {language && (
            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">
              {language}
            </div>
          )}
          <MemoizedSyntaxHighlighter
            language={language || 'text'}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: '#1a1a1a',
              fontSize: '0.875rem',
            }}
            wrapLongLines={true}
          >
            {String(children).replace(/\n$/, '')}
          </MemoizedSyntaxHighlighter>
        </div>
      )
    },
    pre: ({children}: {children?: React.ReactNode}) => (
      <pre className="mb-4">
        {children}
      </pre>
    ),
    a: ({href, children}: {href?: string, children?: React.ReactNode}) => (
      <a 
        href={href}
        className="text-blue-400 hover:text-blue-300 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({children}: {children?: React.ReactNode}) => (
      <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 my-4 font-mono">
        {children}
      </blockquote>
    ),
    img: ({src, alt}: {src?: string, alt?: string}) => {
      const imageSrc = src?.startsWith('images/') ? `/blog/${src}` : src
      return (
        <img 
          src={imageSrc}
          alt={alt || ''}
          className="max-w-full h-auto rounded-lg border border-gray-700 my-4"
        />
      )
    },
  }), [])

  useEffect(() => {
    const postMetadata = blogPostsMetadata.find(p => p.slug === slug)
    
    if (postMetadata && slug) {
      loadBlogPost(slug).then((content) => {
        setPost({ ...postMetadata, content })
        setLoading(false)
        document.title = `${postMetadata.title} > Oscar Bennich-Björkman`
      })
    } else {
      setPost(null)
      setLoading(false)
      document.title = 'Post Not Found > Oscar Bennich-Björkman'
    }
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-400 font-mono">Loading post...</p>
      </div>
    )
  }

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
          className="text-purple-400 hover:text-purple-300 font-mono"
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

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/blog')}
        className="text-purple-400 hover:text-purple-300 font-mono mb-8 flex items-center gap-2 cursor-pointer"
      >
        ← Back to Blog
      </button>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-gray-500">•</span>
          <span>{calculateReadingTime(post.content)} min read</span>
          <span className="text-gray-500">•</span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-white bg-gray-700 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none bg-gray-800 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-gray-800">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default BlogPost
