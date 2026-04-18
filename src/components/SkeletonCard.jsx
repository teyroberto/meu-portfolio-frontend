export function SkeletonCard() {
  return (
    <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800/50 animate-pulse">
      <div className="w-20 h-20 bg-zinc-800 rounded-2xl mx-auto mb-6"></div>
      <div className="h-6 bg-zinc-800 rounded-lg w-3/4 mx-auto mb-4"></div>
      <div className="h-4 bg-zinc-800 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-zinc-800 rounded-lg w-2/3 mx-auto mb-8"></div>
      <div className="h-8 bg-zinc-800 rounded-full w-24 mx-auto"></div>
    </div>
  )
}