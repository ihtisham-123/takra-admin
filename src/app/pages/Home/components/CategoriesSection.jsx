"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import CategoriesErrorFallback from './CategoriesErrorFallback';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sliderRef = useRef(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success && data.data?.length > 0) {
        setCategories(data.data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || categories.length === 0 || hoveredCard !== null) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length, hoveredCard]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Get visible cards (show 3 on desktop, 1 on mobile)
  const getVisibleCategories = () => {
    if (categories.length === 0) return [];
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % categories.length;
      result.push({ ...categories[index], position: i });
    }
    return result;
  };

  // Category Card Component with premium styling
  const CategoryCard = ({ category, idx, isCenter }) => {
    const cardColor = category.color || '#7F1D1D';
    
    return (
      <div
        className={`
          w-full md:w-[320px] shrink-0 perspective-1000
          transform transition-all duration-700 ease-out
          ${isCenter ? 'scale-100 z-10' : 'scale-90 opacity-70'}
          ${idx === 0 ? 'md:-translate-x-4' : ''}
          ${idx === 2 ? 'md:translate-x-4' : ''}
          hidden md:block
          ${isCenter ? '!block' : ''}
        `}
        onMouseEnter={() => setHoveredCard(idx)}
        onMouseLeave={() => setHoveredCard(null)}
      >
          <div 
            className={`
              group relative h-[380px] rounded-[2rem] overflow-hidden
              transform-gpu transition-all duration-500
              ${hoveredCard === idx ? 'scale-105 rotate-y-2' : ''}
              cursor-pointer
            `}
            style={{
              background: `linear-gradient(165deg, ${cardColor} 0%, ${cardColor}dd 50%, ${cardColor}99 100%)`,
              boxShadow: isCenter 
                ? `0 25px 60px -15px ${cardColor}60, 0 0 0 1px ${cardColor}30`
                : `0 15px 40px -10px ${cardColor}40`
            }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-2xl transform -translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform duration-700"></div>
            </div>

            {/* Shine Effect on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)',
                transform: 'translateX(-100%)',
                animation: hoveredCard === idx ? 'shine 0.8s ease-in-out forwards' : 'none'
              }}
            ></div>

            {/* Content Container */}
            <div className="relative h-full p-8 flex flex-col justify-between z-10">
              {/* Top Section */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  <span className="text-white/90 text-[10px] tracking-wider uppercase font-medium">
                    {category.competitionsCount || 0} Events
                  </span>
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div 
                    className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  >
                    {category.icon || '🏆'}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-white/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>

                {/* Category Name */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                  {category.description || 'Explore exciting competitions in this category.'}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs"
                    >
                      👤
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white/40 flex items-center justify-center text-[10px] text-white font-medium">
                    +99
                  </div>
                </div>

               
              </div>
            </div>

            {/* Bottom Indicator for center card */}
            {isCenter && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/50 rounded-t-full"></div>
            )}
          </div>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-red-50/30 to-white overflow-hidden">
      {/* CSS for shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-4">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-red-800 text-xs tracking-[0.2em] uppercase font-medium">Explore Categories</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">Competition Categories</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Choose from a diverse range of competitions across multiple disciplines
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-px bg-red-800/30"></div>
            <div className="w-2 h-2 bg-red-800/50 rounded-full"></div>
            <div className="w-12 h-px bg-red-800/30"></div>
          </div>
        </div>

        {/* Error Fallback */}
        {error && !isLoading && (
          <CategoriesErrorFallback onRetry={fetchCategories} />
        )}

        {/* Slider Container */}
        {!error && (
          <>
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-14 h-14 rounded-full bg-white shadow-xl shadow-red-900/10 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-800 hover:border-red-200 hover:shadow-red-200/50 transition-all duration-300 hover:scale-110"
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-14 h-14 rounded-full bg-white shadow-xl shadow-red-900/10 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-800 hover:border-red-200 hover:shadow-red-200/50 transition-all duration-300 hover:scale-110"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Cards Container */}
              <div 
                ref={sliderRef}
                className="flex justify-center items-center gap-6 px-12 transition-all duration-500 ease-out min-h-[420px]"
              >
                {isLoading ? (
                  // Loading skeletons with gradient
                  [...Array(3)].map((_, i) => (
                    <div key={i} className={`w-full md:w-[320px] shrink-0 ${i !== 1 ? 'hidden md:block opacity-70 scale-90' : ''}`}>
                      <div className="h-[380px] rounded-[2rem] bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse overflow-hidden">
                        <div className="p-8 h-full flex flex-col justify-between">
                          <div>
                            <div className="w-24 h-6 bg-gray-300/50 rounded-full mb-6"></div>
                            <div className="w-20 h-20 bg-gray-300/50 rounded-2xl mb-6"></div>
                            <div className="w-2/3 h-7 bg-gray-300/50 rounded-lg mb-3"></div>
                            <div className="w-full h-4 bg-gray-300/30 rounded mb-2"></div>
                            <div className="w-4/5 h-4 bg-gray-300/30 rounded"></div>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
                            <div className="flex -space-x-2">
                              {[...Array(4)].map((_, j) => (
                                <div key={j} className="w-8 h-8 rounded-full bg-gray-300/50"></div>
                              ))}
                            </div>
                            <div className="w-24 h-10 bg-gray-300/50 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  getVisibleCategories().map((category, idx) => (
                    <CategoryCard 
                      key={`${category._id}-${idx}`}
                      category={category}
                      idx={idx}
                      isCenter={idx === 1}
                    />
                  ))
                )}
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-10">
                {categories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`
                      transition-all duration-300 rounded-full
                      ${currentIndex === index 
                        ? 'w-10 h-3 bg-gradient-to-r from-red-900 to-red-700' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-red-400'
                      }
                    `}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-14">
              <Link 
                href="/categories"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white font-medium shadow-xl shadow-red-900/25 hover:shadow-2xl hover:shadow-red-900/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span>View All Categories</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
