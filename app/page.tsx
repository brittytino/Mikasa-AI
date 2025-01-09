'use client'

import { Suspense } from 'react'
import Terminal from './components/terminal'
import Scene from './components/scene'
import { Loader } from './components/loader'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </div>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-8 font-aot text-6xl font-bold tracking-wider text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] sm:text-7xl lg:text-8xl">
          MikasaAI
        </h1>
        <div className="w-full max-w-4xl px-4">
          <Terminal />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)]" />
    </main>
  )
}

