import {FaAddressCard, FaCoins} from 'react-icons/fa'
import {FaClipboardList} from 'react-icons/fa'
import { MdAssignmentAdd } from 'react-icons/md'
import {PiSignOutBold} from 'react-icons/pi'
import { NavLink, useParams } from 'react-router-dom'
import logo  from '../assets/logo.png'
import {  useState } from 'react'
import React from 'react'
import axios from 'axios'

type Order = {
  name: string,
  category1: string,
  category2: string,
  category3: string,
  pho: string,
  item1Name: string,
  item2Name: string,
  item3Name: string,

  item1Count: number,
  item2Count: number,
  item3Count: number,

  date:string,
  time:string,
  id:string,
  idUser:string,
  location:string,
  status:string,
 comment:string,
 points:number,
}
export const SideNav = () => {
    const {id} = useParams()

    const signOut = () =>{

      
            localStorage.setItem('isLogged','false');
            window.location.href='/login';
       
      
      };

      const [coin, setCoin] = useState(0);
      const [discountCode, setDiscountCode] = useState("");
      



      React.useEffect(() => {
        getData();
      }, []);
      

      const getData = () => {
        axios
          .get('https://64facb17cb9c00518f7a31dc.mockapi.io/orders')
          .then((response) => {
            const orders: Order[] = response.data;
            const matchedOrders = orders.filter((order: Order) => order.idUser === `${id}`);
            const totalCoins = matchedOrders.reduce((acc, order) => {
              const coinValue = order.points

              if (!isNaN(coinValue)) {
                return acc + coinValue;
              }
              return acc;
            }, 0);
            setCoin(totalCoins);
            if(totalCoins>=100){
              setDiscountCode("raskulah2030");
            }
          })
          .catch(() => {
          });
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
        <NavLink  to={`/user/${id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
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
        <NavLink  to={`/user/orderRe/${id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#9BE8D8" : "",

               };
              }}>
            <MdAssignmentAdd className="w-6 h-6" />
            <span className="mr-3 text-lg">تقديم طلب</span>
          </NavLink>
        </li>
        <li>
        <NavLink  to={`/user/orders/${id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#9BE8D8] group"
        style={({ isActive}) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#9BE8D8" : "",

               };
              }}>
            <FaClipboardList className="w-6 h-6" />
            <span className="mr-3 text-lg">طلباتي</span>
          </NavLink>
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
        <li>
          <div
            className="flex flex-col items-center mt-80 p-2 text-gray-900 rounded-lg dark:text-white group"
          >
            <FaCoins className="w-6 h-6 text-yellow-300" />
            <span className="mr-3 text-lg ">{coin}</span>
            <span className="mr-3 text-lg">نقطه</span>
            <div>
            {discountCode == "" ? null :
            <p className='text-black font-bold '>كوبون خصم {discountCode} <p>غير مفعل حاليا</p> </p>
            
            }
            </div>
          </div>
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
