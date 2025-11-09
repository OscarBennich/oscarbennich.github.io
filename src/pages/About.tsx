import { useEffect } from 'react'
import csharpIcon from '../assets/csharp.svg'
import gitIcon from '../assets/git.svg'
import reactIcon from '../assets/react.svg'
import typescriptIcon from '../assets/typescript.svg'
import azureIcon from '../assets/azure.svg'
import pielineIcon from '../assets/pipeline.svg'
import dockerIcon from '../assets/docker.svg'

interface TechItem {
  name: string
  icon: React.ReactNode
}

function About(): React.ReactElement {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman > About'
  }, [])

  const techStack: TechItem[] = [
    { name: ".NET (C#)", icon: <img src={csharpIcon} alt=".NET (C#)" className="w-4 h-4" /> },
    { name: "Azure", icon: <img src={azureIcon} alt="Azure" className="w-4 h-4" /> },
    { name: "React", icon: <img src={reactIcon} alt="React" className="w-4 h-4" /> },
    { name: "TypeScript & JavaScript", icon: <img src={typescriptIcon} alt="TypeScript & JavaScript" className="w-4 h-4" /> },
    { name: "CI/CD pipelines", icon: <img src={pielineIcon} alt="CI/CD pipelines" className="w-4 h-4" /> },
    { name: "Docker", icon: <img src={dockerIcon} alt="Docker" className="w-4 h-4" /> },
    { name: "Git", icon: <img src={gitIcon} alt="Git" className="w-4 h-4" /> },
    { name: "Team Leadership", icon: "🧑‍🤝‍🧑" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-100 font-mono mb-12 text-center">
          /about
        </h1>
        
        {/* Skills Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-100 font-mono mb-6 text-center">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1.5 text-sm font-mono bg-gray-900/50 border border-purple-500/30 text-gray-300 rounded-full hover:border-purple-500/60 hover:text-gray-100 transition-colors flex items-center gap-2"
              >
                <span className="text-base flex items-center">{tech.icon}</span>
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* CV Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-100 font-mono mb-4 text-center">
            Curriculum Vitae
          </h2>
          <p className="text-gray-400 font-mono mb-6 text-center">
            View or download my CV as a PDF
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/CV_OscarBennichBjorkman_2025_en.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg transition-all duration-300 hover:[box-shadow:-3px_-3px_0_rgba(16,185,129,0.8)]"
            >
              View CV
            </a>
            <a 
              href="/CV_OscarBennichBjorkman_2025_en.pdf"
              download
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-all duration-300 hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8)]"
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
