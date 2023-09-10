import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


  

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
                <button type="button" className="flex flex-1 justify-center items-center w-3/12 px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-[#e96262] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-[#edacac]"
                onClick={()=>{deleteOrder(order.id)}}>
                حذف
                </button>
              
  
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

export default OrdersContent