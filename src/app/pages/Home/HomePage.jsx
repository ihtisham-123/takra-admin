import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5"></div>
        
        {/* Animated background circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            <span className="text-xs text-zinc-400 tracking-[0.3em] uppercase">Now Available</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            <span className="block">THIS IS YOUR</span>
            <span className="block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                GATEWAY
              </span>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Building the future of digital experiences. Modern solutions for the modern web.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 rounded-full bg-white text-black font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Get Started
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium tracking-wide transition-all duration-300 hover:bg-white/5 hover:border-white/40">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-zinc-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">What We Offer</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Web Development", desc: "Modern, responsive websites built with cutting-edge technology.", icon: "🌐" },
              { title: "UI/UX Design", desc: "Beautiful interfaces that users love to interact with.", icon: "🎨" },
              { title: "Digital Strategy", desc: "Data-driven approaches to grow your digital presence.", icon: "📈" },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.05]"
              >
                <span className="text-4xl mb-6 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
