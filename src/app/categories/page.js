"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success && data.data?.length > 0) {
        setCategories(data.data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-16">
            <div className="h-4 w-32 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-72 bg-gray-200 rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-gray-100 rounded-lg mx-auto animate-pulse" />
          </div>
          {/* Cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[340px] rounded-[2rem] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Failed to load categories
          </h2>
          <p className="text-gray-500 mb-8">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={fetchCategories}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-red-900 to-red-800 text-white font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,0,0,0.3)] shadow-lg shadow-red-900/20"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-28 pb-20 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-red-200/50 mb-6 shadow-lg shadow-red-900/5 backdrop-blur-sm">
            <span className="w-2 h-2 bg-red-700 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
            <span className="text-xs text-red-900 tracking-[0.3em] uppercase font-medium">
              Browse Categories
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            All{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-700 to-red-900">
              Categories
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-800/50" />
            <div className="w-2 h-2 bg-red-800/60 rounded-full" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-800/50" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore the diverse range of competitions across multiple domains.
            Find your stage and showcase your talent.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const cardColor = category.color || "#7F1D1D";

            return (
             
                <div
                  className="relative h-[340px] rounded-[2rem] overflow-hidden transform-gpu transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer"
                  style={{
                    background: `linear-gradient(165deg, ${cardColor} 0%, ${cardColor}dd 50%, ${cardColor}99 100%)`,
                    boxShadow: `0 20px 50px -15px ${cardColor}50, 0 0 0 1px ${cardColor}20`,
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-2xl transform -translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform duration-700" />
                  </div>

                  {/* Shine Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col justify-between z-10">
                    {/* Top Section */}
                    <div>
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span className="text-white/90 text-[10px] tracking-wider uppercase font-medium">
                          {category.competitionsCount || 0} Events
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="relative mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          {category.icon || "🏆"}
                        </div>
                        <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-white/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      </div>

                      {/* Name */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                        {category.description ||
                          "Explore exciting competitions in this category."}
                      </p>
                    </div>

                    {/* Bottom Section - Slug + Explore */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      {/* Slug display */}
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-xs">/</span>
                        <span className="text-white/60 text-xs font-mono tracking-wide bg-white/10 px-2.5 py-1 rounded-lg">
                          {category.slug}
                        </span>
                      </div>

                      {/* Explore button */}
                     
                    </div>
                  </div>
                </div>
            );
          })}
        </div>

        {/* Empty state (categories fetched but array empty - shouldn't hit due to error handling, but just in case) */}
        {categories.length === 0 && !isLoading && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No categories yet
            </h3>
            <p className="text-gray-500 mt-2">
              Check back soon for upcoming competitions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
