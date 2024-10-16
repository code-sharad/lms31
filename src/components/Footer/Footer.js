import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-20 animate__animated animate__fadeInUp">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Logo and Social Media Links */}
        <div className="mb-8 md:mb-0">
          <img src="https://res.cloudinary.com/dsh5742fk/image/upload/v1724819986/wrgfrraabefqsxvl4cse.png" alt="Arohi Software Logo" className="w-32 mb-4" />
         <p className='mb-3 font-bold text-2xl'> Arohi Software</p>
          <div className="flex gap-4">
           
            <a href="https://www.twitter.com/ArohiSoftware" className="hover:text-blue-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557a9.933 9.933 0 01-2.828.775 4.937 4.937 0 002.165-2.724 9.874 9.874 0 01-3.127 1.195 4.924 4.924 0 00-8.388 4.488 13.978 13.978 0 01-10.15-5.144 4.916 4.916 0 001.523 6.573 4.902 4.902 0 01-2.231-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.085 4.928 4.928 0 004.604 3.417A9.869 9.869 0 010 21.539a13.94 13.94 0 007.548 2.213c9.055 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.637A9.936 9.936 0 0024 4.557z"/></svg>
            </a>
            <a href="https://www.instagram.com/ArohiSoftware" className="hover:text-blue-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.342-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.585.071-2.994.348-4.086 1.439-1.092 1.092-1.368 2.501-1.439 4.086-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.071 1.585.348 2.994 1.439 4.086 1.092 1.092 2.501 1.368 4.086 1.439 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.585-.071 2.994-.348 4.086-1.439 1.092-1.092 1.368-2.501 1.439-4.086.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.071-1.585-.348-2.994-1.439-4.086-1.092-1.092-2.501-1.368-4.086-1.439-1.28-.058-1.688-.072-4.947-.072z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/arohi-software/mycompany/" className="hover:text-blue-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.326-.024-3.038-1.852-3.038-1.852 0-2.135 1.448-2.135 2.945v5.662H9.354V9h3.415v1.561h.049c.476-.9 1.636-1.852 3.366-1.852 3.6 0 4.268 2.371 4.268 5.451v6.292zM5.337 7.433c-1.144 0-2.067-.924-2.067-2.067 0-1.143.923-2.067 2.067-2.067s2.067.924 2.067 2.067c0 1.143-.923 2.067-2.067 2.067zm1.777 13.019H3.561V9h3.553v11.452zM22.225 0H1.771C.791 0 0 .792 0 1.771v20.457C0 23.208.791 24 1.771 24h20.457C23.208 24 24 23.208 24 22.229V1.771C24 .792 23.208 0 22.225 0z"/></svg>
            </a>
            <a href="https://www.youtube.com/ArohiSoftware" className="hover:text-blue-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a2.926 2.926 0 00-2.055-2.056C19.725 3.5 12 3.5 12 3.5s-7.725 0-9.443.63a2.926 2.926 0 00-2.056 2.056C0 7.904 0 12 0 12s0 4.096.63 5.814a2.926 2.926 0 002.056 2.056C4.275 20.5 12 20.5 12 20.5s7.725 0 9.443-.63a2.926 2.926 0 002.056-2.056C24 16.096 24 12 24 12s0-4.096-.502-5.814zM9.54 15.568V8.432L16.318 12 9.54 15.568z"/></svg>
            </a>
          </div>
        </div>
        
        {/* Company Info */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">About</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Support</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Pricing and Refund</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Hire from Us</a></li>
          </ul>
        </div>
        
        {/* Community */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Community</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Inertia</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Discord</a></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="mb-2">123 Street, City</p>
          <p className="mb-2">Email: example@gmail.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
      <div className='text-center mt-16 mb-5 text-xl'>
      copyright @2024 Arohi Software
      </div>
    </footer>
  );
}

export default Footer;
