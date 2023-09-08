import 'flowbite'
import {FaAddressCard} from 'react-icons/fa'
import {FaClipboardList} from 'react-icons/fa'
import { MdAssignmentAdd } from 'react-icons/md'
import {PiSignOutBold} from 'react-icons/pi'
import { NavLink, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import logo  from '../assets/logo.png'

export const SideNav = () => {
    const {id} = useParams()

    const signOut = () =>{

        Swal.fire({
          title: 'هل انت متأكد من تسجيل الخروج؟',
          showCancelButton: true,
          confirmButtonColor: '#9BE8D8',
          cancelButtonColor: '#3085d6',
          confirmButtonText: ' نعم',
          cancelButtonText: 'لا',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('isLogged','false');
            window.location.href='/login';
          }
        })
      
      };
  return (
<div>
  <aside
    id="logo-sidebar"
    className="fixed top-0 right-0 z-40 w-64 h-screen transition-transform translate-x-0"
    aria-label="Sidebar"
    dir="rtl"
  >
    <div className="h-full px-3 py-4 bg-[#78C1F3] shadow-xl">
      <a href="/" className="flex items-center pl-2.5 mb-12">
        <img src={logo} className="h-16 mr-3 ml-3" />
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">رسكله</span>
      </a>
      <ul className="space-y-3 font-medium">
        <li>
        <NavLink  to={`/user/${id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
              color: isActive ? "#3197F3" : "",

               };
              }}>
            <FaAddressCard className="w-6 h-6" />
            <span className="mr-3 text-lg">معلوماتي</span>
          </NavLink>
        </li>
        <li>
        <NavLink  to={`/user/orderRe/${id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
              color: isActive ? "#3197F3" : "",

               };
              }}>
            <MdAssignmentAdd className="w-6 h-6" />
            <span className="mr-3 text-lg">تقديم طلب</span>
          </NavLink>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
          >
            <FaClipboardList className="w-6 h-6" />
            <span className="mr-3 text-lg">طلباتي</span>
          </a>
        </li>
        <li>
          <button
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
            onClick={()=>{signOut()}}
          >
            <PiSignOutBold className="w-6 h-6" />
            <span className="mr-3 text-lg">تسجيل خروج</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</div>
  )
}
