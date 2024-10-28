import React from 'react'

const Notfound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">
        Oops! Page Not Found
      </p>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
    </div>
  </div>
  )
}

export default Notfound