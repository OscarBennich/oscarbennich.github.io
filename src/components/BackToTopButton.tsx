import { useState, useEffect } from 'react'

interface BackToTopButtonProps {
  scrollThreshold?: number
}

function BackToTopButton({ scrollThreshold = 400 }: BackToTopButtonProps): React.ReactElement | null {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollThreshold])

  const scrollToTop = () => {
    // Remove section anchor from URL (for hash-based routing)
    const routeHash = window.location.hash.split('#').slice(0, 2).join('#')
    window.history.pushState(null, '', routeHash)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showButton) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-purple-600 hover:bg-purple-500 text-white p-2.5 md:p-3 rounded-full shadow-lg transition-all cursor-pointer z-50 opacity-90 hover:opacity-100"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  )
}

export default BackToTopButton
