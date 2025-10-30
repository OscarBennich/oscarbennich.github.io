function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-4 font-mono transition-all duration-300 hover:[text-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]">
        Oscar Bennich-Björkman
      </h1>
      <p className="text-xl md:text-2xl font-mono">
        <span className="text-purple-500">Tech Lead</span>
        <span className="text-gray-400"> | </span>
        <span className="text-green-500">Full Stack Developer</span>
      </p>
    </section>
  )
}

export default Hero
