import { useEffect } from 'react'
import csharpIcon from '../assets/csharp.svg'
import dotnetIcon from '../assets/dotnet.svg'
import gitIcon from '../assets/git.svg'
import reactIcon from '../assets/react.svg'
import typescriptIcon from '../assets/typescript.svg'
import javascriptIcon from '../assets/javascript.svg'
import azureIcon from '../assets/azure.svg'
import pielineIcon from '../assets/pipeline.svg'
import dockerIcon from '../assets/docker.svg'
import databaseIcon from '../assets/database.svg'
import apiIcon from '../assets/api.svg'
import profilePicture from '../assets/profile_picture_2024_cropped.jpeg'

interface TechItem {
  name: string
  icon: React.ReactNode
}

function About(): React.ReactElement {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman > About'
  }, [])

  const techStackFirstRow: TechItem[] = [
    { name: "C#", icon: <img src={csharpIcon} alt="C#" className="w-5 h-5" /> },
    { name: "ASP.NET", icon: <img src={dotnetIcon} alt="C#" className="w-4 h-4" /> },
    { name: "Azure", icon: <img src={azureIcon} alt="Azure" className="w-4 h-4" /> },
    { name: "REST APIs", icon: <img src={apiIcon} alt="REST APIs" className="w-4 h-4" /> },
    { name: "SQL", icon: <img src={databaseIcon} alt="SQL" className="w-4 h-4" /> },
    { name: "CI/CD pipelines", icon: <img src={pielineIcon} alt="CI/CD pipelines" className="w-4 h-4" /> }
  ]

  const techStackSecondRow: TechItem[] = [
    { name: "React", icon: <img src={reactIcon} alt="React" className="w-4 h-4" /> },
    { name: "TypeScript", icon: <img src={typescriptIcon} alt="TypeScript" className="w-4 h-4" /> },
    { name: "JavaScript", icon: <img src={javascriptIcon} alt="JavaScript" className="w-4 h-4" /> },
  ]

  const techStackThirdRow: TechItem[] = [
    { name: "Docker", icon: <img src={dockerIcon} alt="Docker" className="w-4 h-4" /> },
    { name: "Git", icon: <img src={gitIcon} alt="Git" className="w-4 h-4" /> }
  ]

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* General Info Section */}
        <div className="mb-12">
          <img
            src={profilePicture}
            alt="Oscar Bennich-Björkman profile picture"
            className="w-40 h-40 object-cover border-2 border-purple-500/30 float-left mt-13 mr-6 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-100 font-mono mb-4">
            &gt; whoami
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-3">
            With over 7 years’ experience working on and leading software
            development teams in both the finance and clinical research
            industries, I help solve problems with a unique mix of technical
            expertise, communication, and strong people skills.
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-3">
            I’ve spent most of my career improving and modernizing systems and
            processes. This usually means working on different parts of the
            stack, but my core competency is C# and the .NET platform. I’ve also
            worked a lot on non‑coding tasks such as streamlining onboarding,
            writing documentation, and leading projects.
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-3">
            In my current role as Tech Lead, I value my ability to be a ”force
            multiplier” for the people around me ‑ helping them improve, grow,
            and become more efficient and productive. This also allows me to
            affect the objectives and outcomes of my team in a much more
            substantial way compared to what I’d be able to do as an individual
            contributor.
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            Outside of work, I enjoy long‑distance running, traveling, gaming
            (Dungeons & Dragons, video/computer games, board games), and
            spending time with my wife, friends, family, and my cat.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-100 font-mono mb-6">
            &gt; skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStackFirstRow.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1.5 text-sm font-mono bg-gray-900/50 border border-purple-500/30 text-gray-300 rounded-full hover:border-purple-500/60 hover:text-gray-100 transition-colors flex items-center gap-2"
              >
                <span className="text-base flex items-center">{tech.icon}</span>
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {techStackSecondRow.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1.5 text-sm font-mono bg-gray-900/50 border border-purple-500/30 text-gray-300 rounded-full hover:border-purple-500/60 hover:text-gray-100 transition-colors flex items-center gap-2"
              >
                <span className="text-base flex items-center">{tech.icon}</span>
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {techStackThirdRow.map((tech) => (
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
        <div>
          <h2 className="text-2xl font-bold text-gray-100 font-mono mb-4">
            &gt; cv
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/CV_OscarBennichBjorkman_2025_en.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg transition-all duration-300 hover:[box-shadow:-3px_-3px_0_rgba(16,185,129,0.8)]"
            >
              View
            </a>
            <a
              href="/CV_OscarBennichBjorkman_2025_en.pdf"
              download
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-all duration-300 hover:[box-shadow:3px_3px_0_rgba(168,85,247,0.8)]"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
