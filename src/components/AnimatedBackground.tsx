function AnimatedBackground() {
  return (
    <>
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>
      
      {/* Static particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500/20 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-500/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-500/20 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-green-500/20 rounded-full"></div>
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-purple-500/10 rotate-45"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-green-500/10 rotate-12"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 border border-purple-500/10 rounded-full"></div>
    </>
  )
}

export default AnimatedBackground
