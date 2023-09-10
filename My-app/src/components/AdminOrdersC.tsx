import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import 'flowbite'

  

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
   
  }
function AdminOrdersC() {
    const [getInfo, setgetInfo] = useState<Order[]>([]);


React.useEffect(() => {
        getData();
}, []);
    
const getData = () => {
        axios
          .get('https://64facb17cb9c00518f7a31dc.mockapi.io/orders')
          .then((response) => {
            setgetInfo(response.data);

           
          })
    }
          
      

    // const acceptOrder = (id: string) => {

    //     Swal.fire({
    //       title: 'قبول الطلب؟',
    //       showCancelButton: true,
    //       confirmButtonColor: '#d33',
    //       cancelButtonColor: '#3085d6',
    //       confirmButtonText: 'نعم',
    //       cancelButtonText: 'لا'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         axios
    //         .put(`https://64facb17cb9c00518f7a31dc.mockapi.io/orders/${id}`,{
    //           status: 'تم قبول الطلب',
    //         })
    //         .then((res) => {
    //           console.log(res);
    //           getData()
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //       }
    //     })
      
    //   };
      const rejectOrder = (id: string) => {

        Swal.fire({
          title: 'حذف الطلب؟',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'حذف',
          cancelButtonText: 'لا'
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .delete(`https://64facb17cb9c00518f7a31dc.mockapi.io/orders/${id}`)
            .then((res) => {
              console.log(res);
              setgetInfo(getInfo.filter((del) => del.id !== id));
            })
            .catch((error) => {
              console.log(error);
            });
          }
        })
      
      };

      
  return (
    <div>

{getInfo.slice().reverse().map((order) => {
 return (
    <div key={order.id}>
    <div className="w-full flex flex-col items-center justify-center mt-16  sm:ml-0 ">
        <div className="flex flex-col items-center bg-white  rounded-lg  w-9/12 shadow md:flex-row md:max-w-xl  md:mr-44 dark:border-gray-700 dark:bg-white " dir='rtl'>
        <div className='w-full bg-white rounded-lg shadow dark:border dark:bg-white p-10  '>
                <div className='grid sm:grid-cols-2 gap-40'>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">طلب رقم {order.id}</h5>
                <div className={`w-36 p-2 text-lg font-medium text-center text-white bg-gray-400  rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${
                   order.status === "تم قبول الطلب" ? 'bg-green-500 ' : 'bg-[#c2c9d4]'
                 }`}>
                {order.status}
                 </div>
                 </div>
                <div className="grid sm:grid-cols-3">
                <div>
                  <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">{order.name}   {order.idUser}</label>
                </div> 
                <div>
                  <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">نوع الماده ١ : {order.category1}</label>
                </div> 
                <div>
                  <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">اسم الماده :  {order.item1Name}</label>
                </div> 
                 <div>
                  <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">الكميه : {order.item1Count}</label>
                </div>

                <div>
                  <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">نوع الماده ٢ : {order.category2}</label>
                </div> 
                <div>
                  <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">اسم الماده : {order.item2Name}</label>
                </div> 
                 <div>
                 <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">الكميه : {order.item2Count}</label>
                </div>

                <div>
                <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">نوع الماده ٣ : {order.category3}</label>
                </div> 
                <div>
                <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">اسم الماده : {order.item3Name}</label>
                </div> 
                 <div>
                 <label className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">الكميه : {order.item3Count}</label>
                </div>
                <div>
                <label className="block mt-2 text-lg font-medium text-[#07074D]">
                يوم استلام الشحنه :  
                </label>
                {order.date}
                </div>
                <div>
                <label className=" block mt-2 text-lg font-medium text-[#07074D]">
                وقت استلام الشحنه :  
                </label>
                {order.time}
                </div>
            </div>
            <div className='flex flex-row gap-10'>
                <button type="button" className={`flex flex-1 justify-center items-center w-3/12 px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900  ${
                  order.status === 'تم قبول الطلب' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#e96262] hover:bg-[#edacac]'
                  }`}
                onClick={()=>{rejectOrder(order.id)}}
                disabled={order.status === 'تم قبول الطلب'}
                >
                رفض الطلب
                </button>
                <button
                  type="button"
                  className={`flex flex-1 justify-center items-center w-3/12 px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${
                  order.status === 'تم قبول الطلب' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3D96D1] hover:bg-[#75c1f4]'
                  }`}
                  // onClick={() => acceptOrder(order.id)}
                 disabled={order.status === 'تم قبول الطلب'}
                  >
                 قبول الطلب
                </button>
  <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button>

<div id="authentication-modal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                <form className="space-y-6" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 
            </div>
            </div>
        </div>
        
        </div>


        </div>
    
        )
    })}










    </div>
  )
}

export default AdminOrdersC