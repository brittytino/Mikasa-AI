export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[url('/images/aot-background.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </div>
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-500 rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

