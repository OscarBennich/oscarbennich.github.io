import { useEffect } from 'react'
import BlogList from '../components/BlogList'
import { blogPosts } from '../data/blogPosts'

function Blog(): React.ReactElement {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman > Blog'
  }, [])
 
  return <BlogList posts={blogPosts} />
}

export default Blog
