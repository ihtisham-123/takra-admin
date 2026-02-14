"use client";

import React from 'react';

const CategoriesErrorFallback = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Error Icon */}
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <svg 
          className="w-10 h-10 text-red-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>

      {/* Error Message */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Unable to Load Categories
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        We couldn't fetch the competition categories at the moment. Please check your connection and try again.
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-900 to-red-800 text-white font-medium shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          <span>Try Again</span>
        </button>
      )}

      {/* Decorative Elements */}
      <div className="flex items-center gap-3 mt-8 opacity-50">
        <div className="w-8 h-px bg-gray-300"></div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-px bg-gray-300"></div>
      </div>
    </div>
  );
};

export default CategoriesErrorFallback;
