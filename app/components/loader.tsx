export function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative">
        <div className="absolute inset-0 animate-[ping_3s_ease-in-out_infinite] rounded-full border-2 border-red-500/50"></div>
        <div className="absolute inset-2 animate-[ping_3s_ease-in-out_infinite_500ms] rounded-full border-2 border-red-500/40"></div>
        <div className="absolute inset-4 animate-[ping_3s_ease-in-out_infinite_1000ms] rounded-full border-2 border-red-500/30"></div>
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-red-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-sm text-red-500">Loading...</span>
        </div>
      </div>
    </div>
  )
}

