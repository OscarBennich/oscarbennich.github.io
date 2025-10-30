import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

function Home() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default Home
