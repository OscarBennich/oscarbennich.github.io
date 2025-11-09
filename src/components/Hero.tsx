function Hero(): React.ReactElement {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="relative z-10 animate-[fadeIn_1s_ease-in]">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-4 font-mono transition-all duration-300">
          Oscar Bennich-Björkman
        </h1>
        <p className="text-xl md:text-2xl font-mono mb-8">
          <span className="text-purple-500">Tech Lead</span>
          <span className="text-gray-400"> | </span>
          <span className="text-green-500">Full Stack Developer</span>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default Hero
