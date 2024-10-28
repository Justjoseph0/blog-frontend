import React from 'react'

const Footer = () => {
  return (
    <footer className='max-w-7xl mx-auto border-t border-gray-400 flex md:flex-row flex-col-reverse md:gap-y-0 gap-y-4 md:px-0 px-4 justify-between md:items-center py-5 text-xl mt-10'>
         <div>
            <p className="mt-2 text-gray-400">© 2024 wurld. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-500 text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-500 text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-500 text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-500 text-gray-400">
            <i className="fa-brands fa-github"></i>
            </a>
          </div>
    </footer>
  )
}

export default Footer