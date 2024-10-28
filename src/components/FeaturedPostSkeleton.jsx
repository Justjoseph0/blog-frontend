import React from 'react'

const FeaturedPostSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-1">
      {/* Main Feature Post Skeleton */}
      <div className="w-full md:w-1/2 relative overflow-hidden group h-96 bg-gray-300 animate-pulse">
        <div className="w-full h-full bg-gray-300"></div>
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4 md:p-6">
          <div className="w-24 h-6 bg-gray-400 rounded mb-2"></div>
          <div className="w-3/4 h-6 bg-gray-400 rounded mb-2"></div>
          <div className="w-1/3 h-4 bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* Side Posts Skeleton */}
      <div className="w-full md:w-1/2 grid md:grid-cols-2 gap-1 md:h-96">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative h-56 md:h-full overflow-hidden group bg-gray-300 animate-pulse"
          >
            <div className="absolute inset-0 w-full h-full bg-gray-300"></div>
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
              <div className="w-16 h-4 bg-gray-400 rounded mb-2"></div>
              <div className="w-3/4 h-5 bg-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedPostSkeleton

