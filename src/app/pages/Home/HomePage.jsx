import React from 'react'
import CategoriesSection from './components/CategoriesSection'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section - Competition Stage Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Snowy/Stage background effects */}
        <div className="absolute inset-0">
          {/* White carpet gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-red-50/30"></div>
          
          {/* Decorative circles - like stage lights */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-50/50 rounded-full blur-3xl"></div>
          
          {/* Stage banner lines */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-900 via-red-800 to-red-900"></div>
          <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-red-200/50 mb-8 shadow-lg shadow-red-900/5 backdrop-blur-sm">
            <span className="w-2 h-2 bg-red-700 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,0,0,0.5)]"></span>
            <span className="text-xs text-red-900 tracking-[0.3em] uppercase font-medium">UCP TAAKRA 2026</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
            <span className="block">WELCOME TO</span>
            <span className="block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-700 to-red-900">
                TAAKRA
              </span>
            </span>
          </h1>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-800/50"></div>
            <div className="w-2 h-2 bg-red-800/60 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-800/50"></div>
          </div>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Pakistan's Premier University Competition Platform. Where talent meets opportunity on the grandest stage.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-red-900 to-red-800 text-white font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,0,0,0.3)] shadow-lg shadow-red-900/20">
              Register Now
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-800 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-red-900/20 text-red-900 font-medium tracking-wide transition-all duration-300 hover:bg-red-50 hover:border-red-900/40">
              View Events
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { number: "50+", label: "Universities" },
              { number: "10K+", label: "Participants" },
              { number: "100+", label: "Events" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-900">{stat.number}</div>
                <div className="text-sm text-gray-500 tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-red-800/50 to-transparent"></div>
        </div>
      </section>
      
      {/* Dynamic Categories Slider */}
      <CategoriesSection />
      
      {/* Stage/Venue Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-red-50/30 via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-800 text-xs tracking-[0.3em] uppercase font-medium">The Venue</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Grand Stage Awaits</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Experience the grandeur of UCP's magnificent campus transformed into a competition arena. 
                With white carpeted walkways, stunning red brick architecture, and world-class facilities, 
                TAAKRA offers an unparalleled experience for participants and spectators alike.
              </p>
              <div className="space-y-4">
                {[
                  "State-of-the-art auditoriums",
                  "Olympic-standard sports facilities",
                  "Professional stage setups",
                  "White carpet red carpet events"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-800 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-amber-50 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-red-900/10 to-amber-100/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏛️</div>
                    <div className="text-red-900 font-bold text-xl">UCP LAHORE</div>
                    <div className="text-gray-500 text-sm">Main Campus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
