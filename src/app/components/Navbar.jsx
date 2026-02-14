"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navlinks } from "../data/nav";
import DownloadButton from "./DownloadButton";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar - Centered Pill */}
      <header className="fixed  top-0 left-0 right-0 z-50 flex justify-center  pt-6 px-4">
        <nav
          className={`
            hidden md:flex items-center gap-1 px-2 py-2
            bg-black/40 backdrop-blur-xl
            border border-white/10
            rounded-full
            transition-all duration-500
            ${isScrolled ? "bg-black/60 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]" : ""}
          `}
        >
          {navlinks.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.id}
                href={item.link}
                className={`
                  relative px-5 py-2.5 rounded-full
                  text-sm font-medium tracking-wide
                  transition-all duration-300
                  ${isActive 
                    ? "text-white" 
                    : "text-zinc-400 hover:text-white"
                  }
                `}
              >
                {item.name}
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Download Button - Right Corner (Desktop/Laptop) */}
        <div className="hidden md:block fixed top-6 right-6">
          <DownloadButton text="Download APP" />
        </div>

        {/* Mobile Right Side - Download Button + Menu Button */}
        <div className="md:hidden fixed top-6 right-4 flex items-center gap-2">
          <DownloadButton text="Download" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-300
          flex
            
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <nav
          className={`
            absolute top-24 left-4 right-4
            bg-black/60 backdrop-blur-xl
            border border-white/10
            rounded-3xl p-6
            transition-all duration-300
            ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
          `}
        >
          <div className="space-y-2">
            {navlinks.map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative block px-4 py-3 rounded-xl
                    text-base font-medium tracking-wide
                    transition-all duration-300
                    ${isActive
                      ? "text-white bg-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                    )}
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
