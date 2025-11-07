import { useEffect } from 'react'
import Hero from '../components/Hero'

function Home() {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman > Home'
  }, [])

  return (
    <Hero />
  )
}

export default Home
