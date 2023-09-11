import axios from 'axios';
import React, {  useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';




type Location = {
    lat: number;
    lng: number;
  };

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
    loc:Location,
    comment:string

   
  }
function AdminRejectOrdersC() {
    const [getInfo, setgetInfo] = useState<Order[]>([]);



    const mapStyles = {
      height: "30vh",
      width: "70%"
    };

 



React.useEffect(() => {
        getData();
}, []);
    
const getData = () => {
        axios
          .get('https://64facb17cb9c00518f7a31dc.mockapi.io/orders')
          .then((response) => {
            console.log(response.data);

                setgetInfo(response.data);

            

           
          })
    }
          
 



      
  return (
    <div>
    <div className="w-full flex flex-col items-center mt-16 sm:ml-0">
                <div className=" bg-white rounded-lg w-9/12   shadow md:flex-row md:mr-44 dark:border-gray-700 dark:bg-white" dir="rtl">
                      <div className=" bg-[#3d96d1] rounded-lg shadow-lg dark:border  p-10 flex justify-center ">
                        <h1 className='text-3xl font-bold text-white'>الطلبات المرفوضه</h1>
                      </div>
                      </div>
       </div>
{getInfo.slice().reverse().map((order) => {
  if (order.status === "تم رفض الطلب") {

    return (
      <div key={order.id}>
        <div className="w-full flex flex-col items-center mt-16 sm:ml-0">
          <div className=" bg-white rounded-lg w-9/12  shadow md:flex-row md:mr-44 dark:border-gray-700 dark:bg-white" dir="rtl">
            <div className=" bg-white rounded-lg shadow dark:border dark:bg-white p-10">
              <div className="flex flex-row justify-between ">
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-black">طلب رقم {order.id}</h5>
                
                <div
                  className={`w-36 p-2 text-lg font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${order.status === 'تم رفض الطلب'
                    ? 'bg-[#e96262]'
                    : order.status === 'تم قبول الطلب'
                      ? 'bg-green-500'
                      : 'bg-[#c2c9d4]'}`}
                >
                  {order.status}
                  <h2 className='p-2'> السبب: {order.comment}</h2>

                </div>
                
              </div>
              <div className="flex flex-row gap-10 ">
                <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">  الاسم:  {order.name} </label>
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
  
              <div className="flex flex-row gap-10 mt-10">
                <label className="block text-xl font-medium text-[#07074D]">
                  يوم استلام الشحنه :
                </label>
                {order.date}
                <label className=" block  text-xl font-medium text-[#07074D]">
                  وقت استلام الشحنه :
                </label>
                {order.time}
  
              </div>
              <div className='flex items-center justify-center mt-10'>
              <LoadScript
                  googleMapsApiKey='AIzaSyCS4sSfKKZs2OZEgzZDZoaH6sMcPvT-arE'>
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={order.loc ? 15 : 12}
                    center={order.loc } 
                  >
                {order.loc && <Marker position={{ lat: order.loc.lat, lng: order.loc.lng }} />}
               </GoogleMap>
                </LoadScript>
              </div>
  
  
  
            </div>
  
          </div>
  
        </div>
  
  
      </div>
  
  
    );
  }
})}

</div>
  )
}

export default AdminRejectOrdersC