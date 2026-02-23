import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AnimatedBackground from './AnimatedBackground'

function Layout(): React.ReactElement {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      <Header />
      <main className="relative z-10 flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
