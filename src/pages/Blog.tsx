import { useEffect, useState } from 'react'
import BlogList from '../components/BlogList'
import { getAllBlogPosts } from '../data/blogPosts'
import { BlogPost } from '../types/blog'

function Blog(): React.ReactElement {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman | Blog'
    
    // Load blog posts
    getAllBlogPosts().then((loadedPosts) => {
      setPosts(loadedPosts)
      setLoading(false)
    })
  }, [])
 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 font-mono">Loading posts...</p>
      </div>
    )
  }

  return <BlogList posts={posts} />
}

export default Blog
