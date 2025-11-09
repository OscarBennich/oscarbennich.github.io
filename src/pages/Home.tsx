import { useEffect } from 'react'
import Hero from '../components/Hero'

function Home(): React.ReactElement {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman > Home'
  }, [])

  return <Hero />
}

export default Home
