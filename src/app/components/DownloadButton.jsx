"use client";
import React, { useState, useEffect } from 'react';

const DownloadButton = ({ text }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: Show instructions for manual install
      alert('To install: Click the menu button in your browser and select "Install App" or "Add to Home Screen"');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <button
        className="px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium tracking-wide border border-emerald-200 cursor-default shadow-md"
      >
        ✓ Installed
      </button>
    );
  }

  return (
    <button
      onClick={handleInstallClick}
      className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-red-900 to-red-800 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,0,0,0.3)] overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {text}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};

export default DownloadButton;
