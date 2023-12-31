import axios from 'axios';
import React, {  useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';


import {


  PopoverContent,
  Popover,
  PopoverHandler,

} from "@material-tailwind/react";
import Swal from 'sweetalert2';

import "@material-tailwind/react";

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
    points:number,

   
  }


function AdminOrdersC() {
    const [getInfo, setgetInfo] = useState<Order[]>([]);
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    const [comment, setComment] = useState('');
    let count= 1;
    const mapStyles = {
      height: "30vh",
      width: "70%"
    };

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const handleMarkerClick = (location: Location) => {
   setSelectedLocation(location);
 };

 const handleInfoWindowClose = () => {
   setSelectedLocation(null);
 };



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
          


    const acceptOrder = (id: string ) => {  
      Swal.fire({
        title: 'هل انت متأكد من اجراء العمليه؟',
        showCancelButton: true,
        confirmButtonColor: '#9BE8D8',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'نعم',
        cancelButtonText: 'لا'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title:'لقد تمت العمليه بنجاح',
            showConfirmButton: false,
            timer:1500
          })
          axios
          .put(`https://64facb17cb9c00518f7a31dc.mockapi.io/orders/${id}`, {
            status: 'تم قبول الطلب',
            date: date,
            time: time,
          })
          .then(() => {
            getData();
          })
          .catch(() => {
          });
          axios
          .put(`https://64facb17cb9c00518f7a31dc.mockapi.io/orders/${id}`, {
            points:100
          })  .then(() => {
            getData();
          })
          .catch(() => {
          });
        }
      })
  
    };
      const rejectOrder = (id: string) => {  
        Swal.fire({
          title: 'هل انت متأكد من اجراء العمليه؟',
          showCancelButton: true,
          confirmButtonColor: '#9BE8D8',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title:'لقد تمت العمليه بنجاح',
              showConfirmButton: false,
              timer:1500
            })
            axios
            .put(`https://64facb17cb9c00518f7a31dc.mockapi.io/orders/${id}`,{
              status: 'تم رفض الطلب',
              comment: comment,
            })
            .then(() => {
              getData()
            })
            .catch(() => {
            });
          }
        })
    
      };

      
  return (
    <div>
            <div className="w-full flex flex-col items-center mt-16 sm:ml-0">
                <div className=" bg-white rounded-lg w-9/12   shadow md:flex-row md:mr-44 dark:border-gray-700 dark:bg-white" dir="rtl">
                      <div className=" bg-[#3d96d1] rounded-lg shadow-lg dark:border  p-10 flex justify-center ">
                        <h1 className='text-3xl font-bold text-white'>الطلبات الحاليه</h1>
                      </div>
                      </div>
                </div>

{getInfo.map((order) => {
if (order.status !== "تم قبول الطلب" ){
  if(order.status !== "تم رفض الطلب"){
  return (
    <div key={order.id}>
       <div className="w-full flex flex-col items-center relative mt-16  sm:ml-0">
        <div className=" bg-white rounded-lg w-10/12  shadow md:flex-row  md:mr-44 md:w-8/12  dark:border-gray-700 dark:bg-white" dir="rtl">
          <div className=" bg-white rounded-lg shadow dark:border dark:bg-white p-10  ">
          <span className="absolute -top-10  -mr-20 z-[-1]">
        <svg
          width={100}
          height={100}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'ScaleY(0.8)' }}


        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
            fill="#C2C9D4"
          />
        </svg>
      </span>
            <div className="flex flex-row justify-between ">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-black">طلب # {count++}</h5>
              <div
                className={`w-36 p-2 text-lg font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${order.status === 'تم قبول الطلب'
                  ? 'bg-green-500'
                  : order.status === 'تم رفض الطلب'
                    ? 'bg-[#e96262]'
                    : 'bg-[#c2c9d4]'}`}
              >
                {order.status}
              </div>
            </div>
            <div className="flex flex-row gap-10 ">
                <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">الاسم: {order.name}</label>
                  <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black"> الرقم: {order.pho}</label>
            </div>
            {order.category1 ? (
            <div className="flex flex-row gap-10 ">
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">نوع الماده  : {order.category1}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">اسم الماده :  {order.item1Name}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">الكميه : {order.item1Count}</label>
              
            </div>
            ) : null}
            {order.category2 ? (
            <div className="flex flex-row gap-10 ">
                <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">
                 نوع المادة  : {order.category2}
                </label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">اسم الماده : {order.item2Name}</label>
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">الكميه : {order.item2Count}</label>
            </div>
            ) : null}

          {order.category3 ? (
            <div className="flex flex-row gap-10 ">
              <label className="block mb-2 mt-6 text-xl font-medium text-gray-900 dark:text-black">نوع الماده  : {order.category3}</label>
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
        center={order.loc}
      >
        {order.loc && (
          <Marker
            position={{ lat: order.loc.lat, lng: order.loc.lng }}
            onClick={() => handleMarkerClick(order.loc)}
          >
            {selectedLocation === order.loc && (
              <InfoWindow onCloseClick={handleInfoWindowClose}>
                <div>
                  <h3>Location: {order.location}</h3>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>
              </LoadScript>
            </div>
            <div className='flex flex-row gap-10'>
            <Popover placement="top">
              <PopoverHandler>
                   <button
                      type="button"
                      className={`flex flex-1 justify-center items-center w-3/12 px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${order.status === 'تم قبول الطلب' || order.status === 'تم رفض الطلب' ? 'hidden' : 'bg-[#3D96D1] hover:bg-[#75c1f4]'}`}
                      >
                      قبول الطلب
                    </button>
            </PopoverHandler>
              <PopoverContent className="w-96">
              <div className="p-6 text-center">
                      <h1 className="text-xl font-bold mb-5">الرجاء تحديد كلا من الاتي:</h1>
                      <div className="mb-5">
                        <label htmlFor="date" className="mb-3 block text-lg font-medium text-[#07074D]">
                          : يوم استلام الشحنة
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          required
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={date}
                          onChange={(e) => setDate(e.target.value)} />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="time" className="mb-3 block text-lg font-medium text-[#07074D]">
                          : وقت استلام الشحنة
                        </label>
                        <input
                          type="time"
                          name="time"
                          id="time"
                          required
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={time}

                          onChange={(e) => setTime(e.target.value)} />
                      </div>
                      <button
                        type="button"
                        className="text-white bg-[#3D96D1] hover:bg-[#75c1f4] focus:ring-4 focus:outline-none font-medium rounded-lg text-lg inline-flex items-center px-5 py-2.5 text-center mr-2"
                        onClick={() => { acceptOrder(order.id); } }

                      >
                        تأكيد
                      </button>
                    </div>
              </PopoverContent>
              </Popover>
              <Popover placement="top">
              <PopoverHandler>
              <button type="button"
                      className={`flex flex-1 justify-center items-center w-3/12 px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900  ${order.status === 'تم قبول الطلب' || order.status === 'تم رفض الطلب' ? 'hidden' : 'bg-[#e96262] hover:bg-[#edacac]'}`}
                      >
                      رفض الطلب
                </button>
            </PopoverHandler>
              <PopoverContent className="w-96">
              <div className="p-6 text-center">
                      <h1 className='text-xl font-bold mb-5'>الرجاء ذكر سبب الرفض :: </h1>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                          rejectOrder(order.id);
                          }}>
                      <div>
                        <textarea id="message" name="message" rows={4} className="mt-1 mb-2 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder='الكتابه هنا.....'
                          value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-[#3D96D1] hover:bg-[#75c1f4] focus:ring-4 focus:outline-none font-medium rounded-lg text-lg inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        تأكيد
                      </button>
                      </form>
                    </div>
              </PopoverContent>
              </Popover>

                 
            </div>
 

          </div>

        </div>

      </div>
     


    </div>


  );
}
}
  
})}

{getInfo.every(order => order.status === "تم قبول الطلب" || order.status === "تم رفض الطلب") && (
    <div>
         <div className="w-full flex flex-col items-center mt-16 sm:ml-0">
                <div className=" bg-white rounded-lg w-9/12   shadow md:flex-row md:mr-44 dark:border-gray-700 dark:bg-white" dir="rtl">
                      <div className=" bg-white rounded-lg shadow-lg dark:border  p-36 flex justify-center ">
                        <h1 className='text-3xl font-bold text-[#3d96d1]'>لايوجد شيء حاليا... </h1>
                      </div>
                      </div>
                </div>
    </div>
  )}







    </div>
  )
}

export default AdminOrdersC