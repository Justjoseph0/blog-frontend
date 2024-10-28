import React from 'react'

const CardSkelenton = () => {
  return (
    <div className='flex justify-between'>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="w-72 rounded-md overflow-hidden shadow-xl bg-white mx-4 animate-pulse">
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div> 
          <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div> 
          <div className="mt-4 flex items-center text-gray-500 text-sm">
            <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div> 
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default CardSkelenton
