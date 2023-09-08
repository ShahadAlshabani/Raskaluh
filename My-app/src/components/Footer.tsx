import { FaInstagram } from 'react-icons/fa';
import { FaTwitter, FaFacebook } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div>

    <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow mt-8 flex flex-row justify-between md:items-center md:p-6 dark:bg-[#78C1F3] font-mono">  
          <span className="text-sm font-bold text-white sm:text-center dark:text-white">© 2023 <a href="/" className="hover:underline text-right">رسكله</a> 
            <p>جميع الحقوق محفوظه </p>
             </span>
             <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="https://www.facebook.com/profile.php?id=61550957464220" className="text-white hover:text-gray-900 dark:hover:text-blue-500">
                 <FaFacebook className="w-7 h-10" />
                <span className="sr-only">Facebook page</span>      
              </a>
              <a href="https://www.instagram.com/raskaluh/" className="text-white hover:text-gray-900 dark:hover:text-blue-500">
              <FaInstagram className="w-7 h-10" />
                <span className="sr-only">Instagram page</span>
              </a>
              <a href="https://twitter.com/raskaluh_" className="text-white hover:text-gray-900 dark:hover:text-blue-500">
                 <FaTwitter className="w-7 h-10" />
                <span className="sr-only">Twitter page</span>
              </a>
           

          </div>
        </footer>

    </div>
  )
}
