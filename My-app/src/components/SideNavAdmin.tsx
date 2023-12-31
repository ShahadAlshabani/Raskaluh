import {FaAddressCard} from 'react-icons/fa'
import {  MdPlaylistAdd, MdPlaylistAddCheck, MdPlaylistRemove } from 'react-icons/md'
import {PiSignOutBold} from 'react-icons/pi'
import { NavLink, useParams } from 'react-router-dom'
import logo  from '../assets/logo.png'
import 'flowbite'
import { useState } from 'react'


export const SideNavAdmin = () => {
    const {id} = useParams()

    const signOut = () =>{

      
            localStorage.setItem('isLoggedAdmin','false');
            window.location.href='/login';
       
      
      };

      const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);

    };
  return (
<div>

    <aside    
    className={`fixed top-0 right-0 z-40 w-full h-screen ${isMenuOpen ? 'flex' : 'hidden'} transition-transform translate-x-0 md:flex lg:w-64 md:w-64  `}
    aria-label="Sidebar"
    dir="rtl"
  >
 
    <div className="h-full px-3 py-4 bg-[#3d96d1] shadow-xl">
      <a href="/" className="flex items-center pl-2.5 mb-12">
        <img src={logo} className="h-16 mr-3 ml-3" />
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">رسكله</span>
      </a>
      <ul className="space-y-3 font-medium">
        <li>
        <NavLink  to={`/admin/${id}`} className="flex items-center p-2 mr-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
              color: isActive ? "#9BE8D8" : "",

               };
              }}>
            <FaAddressCard className="w-6 h-6" />
            <span className="mr-3 text-lg">معلوماتي</span>
          </NavLink>
        </li>
        <li>
        <NavLink  to={`/admin/orders/${id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#9BE8D8" : "",

               };
              }}>
            <MdPlaylistAdd className="w-7 h-7" />
            <span className="mr-3 text-lg">الطلبات الحاليه</span>
          </NavLink>
        </li>
        <li>
        <NavLink  to={`/admin/AcOrders/${id}`}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#9BE8D8" : "",

               };
              }}>
            <MdPlaylistAddCheck className="w-7 h-7" />
            <span className="mr-3 text-lg">الطلبات المقبوله</span>
          </NavLink>
        </li>
        <li>
        <NavLink  to={`/admin/ReOrders/${id}`} className="flex items-center  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#9BE8D8" : "",

               };
              }}>
            <MdPlaylistRemove className="w-7 h-7 " />
            <span className="mr-3 text-lg">الطلبات المرفوضه</span>
          </NavLink>
        </li>
        <li>
          <button
            className="flex items-center mr-1 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
            onClick={()=>{signOut()}}
          >
            <PiSignOutBold className="w-6 h-6" />
            <span className="mr-3 text-lg">تسجيل خروج</span>
          </button>
        </li>
      
      </ul>
    </div>
  </aside>
  <button
   aria-expanded={isMenuOpen ? 'true' : 'false'}
   onClick={toggleMenu}
        type="button"
        className="z-50 fixed top-0 left-0 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#9BE8D8] dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
 
</div>
  )
}