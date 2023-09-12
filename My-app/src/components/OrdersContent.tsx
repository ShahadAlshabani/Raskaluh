import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';


  

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
  }
function OrdersContent() {
    const {id} = useParams()
    const [getInfo, setgetInfo] = useState<Order[]>([]);


React.useEffect(() => {
        getData();
}, []);
    
const getData = () => {
        axios
          .get('https://64facb17cb9c00518f7a31dc.mockapi.io/orders')
          .then((response) => {
            const orders: Order[] = response.data;
            const matchedOrders = orders.filter((order: Order) => order.idUser === `${id}`);
            setgetInfo(matchedOrders);

           
          })
    }
          
          

    const deleteOrder = (id: string) => {

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

<div className="w-full flex flex-col items-center mt-16 sm:ml-0">
                <div className=" bg-white rounded-lg w-9/12   shadow md:flex-row md:mr-44 dark:border-gray-700 dark:bg-white" dir="rtl">
                      <div className=" bg-[#3d96d1] rounded-lg shadow-lg dark:border  p-10 flex justify-center ">
                        <h1 className='text-3xl font-bold text-white'>الطلبات</h1>
                      </div>
                      </div>
                </div>

{getInfo.slice().reverse().map((order) => {

  return (
    <div key={order.id}>
      <div className="w-full flex flex-col items-center mt-16 sm:ml-0">
        <div className=" bg-white rounded-lg w-9/12  shadow md:flex-row md:mr-44 dark:border-gray-700 dark:bg-white" dir="rtl">
          <div className=" bg-white rounded-lg shadow dark:border dark:bg-white p-10">
            <div className="flex flex-row justify-between ">
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-black">طلب رقم {order.id}</h5>
              <div
                 className={`w-36 p-2 text-lg font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${order.status === 'تم قبول الطلب'
                 ? 'bg-green-500'
                 : order.status === 'تم رفض الطلب'
                 ? 'bg-[#e96262]'
                 : 'bg-[#c2c9d4]'}`}
             >
               {order.status}
               {order.status === 'تم رفض الطلب' && <h2 className="p-2"> السبب: {order.comment}</h2>}
              </div>
            </div>
            <div className="flex flex-row gap-10 ">
                <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">الاسم: {order.name}</label>
                  <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black"> الرقم: {order.pho}</label>
            </div>
            {order.category1 ? (
            <div className="flex flex-row gap-10 ">
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">نوع الماده ١ : {order.category1}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">اسم الماده :  {order.item1Name}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">الكميه : {order.item1Count}</label>
              
            </div>
            ) : null}
            {order.category2 ? (
            <div className="flex flex-row gap-10 ">
                <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">
                 نوع المادة ٢ : {order.category2}
                </label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">اسم الماده : {order.item2Name}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">الكميه : {order.item2Count}</label>
            </div>
            ) : null}

          {order.category3 ? (
            <div className="flex flex-row gap-10 ">
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">نوع الماده ٣ : {order.category3}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">اسم الماده : {order.item3Name}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">الكميه : {order.item3Count}</label>
            </div>
          ) : null}
            <div className="flex flex-row  mt-10 gap-10">
            <div className='flex flex-row '>
              <label className="block text-xl font-medium text-[#07074D]">
                يوم استلام الشحنه  :
              </label>
              <p className="text-lg mr-3 font-medium text-[#07074D]">{order.date}</p>
              </div>
              <div className='flex flex-row '>
              <label className=" block text-xl font-medium text-[#07074D]">
                وقت استلام الشحنه  : 
              </label>
              <p className="text-lg mr-3 font-medium text-[#07074D]">{order.time}</p>
              </div>
            
            </div>
            <div className='flex flex-row-reverse'>
            <button type="button"
            onClick={() => { deleteOrder(order.id) }}
                      className={`flex w-3/12 justify-center items-center  px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900  ${order.status === 'تم قبول الطلب' || order.status === 'تم رفض الطلب' ? 'hidden' : 'bg-[#e96262] hover:bg-[#edacac]'}`}
                      >
                   حذف
                </button>
              </div>
          </div>

        </div>

      </div>
      </div>


);


})}


    </div>
  )
}

export default OrdersContent