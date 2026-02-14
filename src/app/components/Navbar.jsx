"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navlinks } from "../data/nav";
import DownloadButton from "./DownloadButton";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for user cookie on mount and on route changes
  useEffect(() => {
    const checkUser = () => {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));
      if (userCookie) {
        try {
          const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
          setUser(userData);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar - Centered Pill */}
      <header className="fixed  top-0 left-0 right-0 z-50 flex justify-center  pt-6 px-4">
        <nav
          className={`
            hidden md:flex items-center gap-1 px-2 py-2
            bg-white/70 backdrop-blur-xl
            border border-gray-200/50
            rounded-full
            shadow-lg shadow-red-900/5
            transition-all duration-500
            ${isScrolled ? "bg-white/90 border-gray-300/50 shadow-[0_8px_30px_rgba(139,0,0,0.1)]" : ""}
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
                    ? "text-red-900" 
                    : "text-gray-600 hover:text-red-800"
                  }
                `}
              >
                {item.name}
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-800 rounded-full shadow-[0_0_8px_rgba(139,0,0,0.6)]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Download Button - Right Corner (Desktop/Laptop) */}
        <div className="hidden md:flex fixed top-6 right-6 items-center gap-3">
          <DownloadButton text="Download APP" />
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-red-900 to-red-800 text-white text-sm font-medium shadow-lg shadow-red-900/20 hover:from-red-800 hover:to-red-700 transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                {isLoggingOut ? "..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-900 to-red-800 text-white text-sm font-medium shadow-lg shadow-red-900/20 hover:from-red-800 hover:to-red-700 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Right Side - Download Button + Menu Button */}
        <div className="md:hidden fixed top-6 right-4 flex items-center gap-2">
          <DownloadButton text="Download" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200/50 text-red-900 shadow-lg"
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
          className="absolute inset-0 bg-white/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <nav
          className={`
            absolute top-24 left-4 right-4
            bg-white/90 backdrop-blur-xl
            border border-gray-200/50
            rounded-3xl p-6
            shadow-xl shadow-red-900/10
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
                      ? "text-red-900 bg-red-50"
                      : "text-gray-600 hover:text-red-800 hover:bg-red-50/50"
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-red-800 rounded-full shadow-[0_0_8px_rgba(139,0,0,0.5)]"></span>
                    )}
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-3 h-px bg-gray-200"></div>

            {/* Auth Section for Mobile */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative block px-4 py-3 rounded-xl
                    text-base font-medium tracking-wide
                    transition-all duration-300
                    ${pathname === "/dashboard"
                      ? "text-red-900 bg-red-50"
                      : "text-gray-600 hover:text-red-800 hover:bg-red-50/50"
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    {pathname === "/dashboard" && (
                      <span className="w-1.5 h-1.5 bg-red-800 rounded-full shadow-[0_0_8px_rgba(139,0,0,0.5)]"></span>
                    )}
                    Dashboard
                  </span>
                </Link>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Logged in as <span className="font-medium text-gray-700">{user.name?.split(" ")[0]}</span></span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={isLoggingOut}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
                  >
                    {isLoggingOut ? "..." : "Logout"}
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-800 text-white text-base font-medium text-center shadow-lg shadow-red-900/20"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
