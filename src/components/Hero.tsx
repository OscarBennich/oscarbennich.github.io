function Hero(): React.ReactElement {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="relative z-10 inline-block p-4 sm:p-6 md:p-12 transition-all duration-300 max-w-full mx-4 border-effect">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-100 mb-4 font-mono wrap-break-word">
          Oscar Bennich-Björkman
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-gray-100">
          <span className="typewriter">Tech Lead && Full Stack Developer<span className="caret">_</span></span>
        </p>
      </div>

      <style>{`
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(35, end) forwards;
          width: 0;
        }
        
        .caret {
          display: inline-block;
          animation: blink 1s step-end infinite;
          opacity: 0;
          animation-delay: 3s;
        }
        
        .border-effect {
          box-shadow: 2px 2px 0 rgba(168,85,247,0.8), -2px -2px 0 rgba(16,185,129,0.8);
        }
        
        @media (min-width: 768px) {
          .border-effect {
            box-shadow: 3px 3px 0 rgba(168,85,247,0.8), -3px -3px 0 rgba(16,185,129,0.8);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
