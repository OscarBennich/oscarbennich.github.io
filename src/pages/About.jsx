function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-100 font-mono mb-8">
          About
        </h1>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
          <p className="text-gray-400 font-mono mb-6">
            View or download my CV as a PDF
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/CV_OscarBennichBjorkman_2025_en.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg transition-all duration-300 hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]"
            >
              View CV
            </a>
            <a 
              href="/CV_OscarBennichBjorkman_2025_en.pdf"
              download
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-all duration-300 hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8),-3px_-3px_0_rgba(16,185,129,0.8)]"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
