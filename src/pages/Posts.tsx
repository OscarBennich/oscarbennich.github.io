import { useEffect, useState } from 'react'
import PostList from '../components/PostList'
import { getAllPosts } from '../data/posts'
import { BlogPost } from '../types/post'

function Posts(): React.ReactElement {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman | Posts'
    
    // Load posts
    getAllPosts().then((loadedPosts) => {
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

  return <PostList posts={posts} />
}

export default Posts
