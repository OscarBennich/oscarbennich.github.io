import { useState } from 'react'

interface CopyButtonProps {
  code: string
}

function CopyButton({ code }: CopyButtonProps): React.ReactElement {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 5000)
  }

  return copied ? (
    <div className="text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 h-[33px]">
      <span className="text-emerald-400">✓</span>
      <span className="text-gray-300">Copied!</span>
    </div>
  ) : (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded border border-gray-600 transition-colors cursor-pointer h-[33px]"
      aria-label="Copy code to clipboard"
    >
      Copy
    </button>
  )
}

export default CopyButton
