import  {  FormEvent, useEffect, useState } from 'react'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import bgimage from '../assets/bgimage.svg'


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

  location:string,
  loc:object,
  status:string,

  points:number,
 
}
function OrderRequestContent() {
  const {id} = useParams()

    const mapStyles = {
        height: "50vh",
        width: "100%"
      };
      const defaultCenter: Location = {
        lat: 24.713552,
        lng: 46.675297
      };
      const [userLocation, setUserLocation] = useState<Location>();
      const [placeName, setPlaceName] = useState<string>('');

      const fetchPlaceName = async (latitude: number, longitude: number) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCS4sSfKKZs2OZEgzZDZoaH6sMcPvT-arE`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setPlaceName(data.results[0].formatted_address);
            setOrderData({...orderData , location:data.results[0].formatted_address})
          }
        } catch (error) {
          console.error('Error fetching place name:', error);
        }
      };
      useEffect(() => {
        // Check if the browser supports Geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLocation = {
                lat: latitude,
                lng: longitude
              };
              setUserLocation(userLocation);
              fetchPlaceName(latitude, longitude);
            },
            (error) => {
              console.error("Error getting user location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }, []);

      const handleMapClick = async (e:  google.maps.MapMouseEvent) => {
        try {
        if (e.latLng) {
          const latitude = e.latLng.lat();
          const longitude = e.latLng.lng();
          setUserLocation({ lat: latitude, lng: longitude });
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCS4sSfKKZs2OZEgzZDZoaH6sMcPvT-arE`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setPlaceName(data.results[0].formatted_address);
            setOrderData({...orderData , location:data.results[0].formatted_address})
          }
        }
        } catch (error) {
          console.error('Error fetching place name:', error);
        }
      };

      const [orderData, setOrderData] = useState<Order>({
        name: "",
        category1: "",
        category2: "",
        category3: "",
        pho: "",
        item1Name: "",
        item2Name: "",
        item3Name: "",

        item1Count: 0,
        item2Count: 0,
        item3Count: 0,

        date:"سيتم تحديده لاحقا",
        time:"سيتم تحديده لاحقا",
        points:0,
        location:"",
        status:"تحت المعالجه",
        loc: { lat: 0, lng: 0 }
      });


      const submitOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({
          title: 'هل انت متأكد من تقديم الطلب؟',
          showCancelButton: true,
          confirmButtonColor: '#9BE8D8',
          cancelButtonColor: '#3085d6',
          confirmButtonText: ' نعم',
          cancelButtonText: 'لا',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post('https://64facb17cb9c00518f7a31dc.mockapi.io/orders', {
              idUser: `${id}`,
              name: orderData.name,
              pho: orderData.pho,
              category1: orderData.category1,
              category2: orderData.category2,
              category3: orderData.category3,
      
              item1Name: orderData.item1Name,
              item2Name: orderData.item2Name,
              item3Name: orderData.item3Name,
      
              item1Count: orderData.item1Count,
              item2Count: orderData.item2Count,
              item3Count: orderData.item3Count,
      
              date:orderData.date,
              time:orderData.time,
      
              location:orderData.location,
              status:orderData.status,
              loc:userLocation,
              points:orderData.points
              
            })
            .then(() => {
              window.location.href=`/user/orders/${id}`
            })
            .catch(() => {
            });
          

          }
         })
   }
  




  return (
    <div>
                
<div className='flex justify-center items-center  w-full ' dir='rtl' 
          > 
<section className="flex flex-col   justify-center items-center   w-full bg-white  "
style={{
  backgroundImage: `url(${bgimage})`,
  textAlign: 'right',
  display: 'flex',
  justifyContent: 'center',
 backgroundRepeat: 'no-repeat'}}>

  <div className="py-8 px-4  max-w-2xl  lg:py-16 md:mr-44">

  
      <form className='w-full bg-white  rounded-lg shadow dark:border dark:bg-white p-10' onSubmit={submitOrder}>
      <h2 className="mb-4 text-2xl  font-bold text-[#3D96D1] ">تقديم طلب استلام المواد المعاد تدويرها</h2>

          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="sm:col-span-3">
                  <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">الاسم :</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="اكتب اسمك الثلاثي" required
                    value={orderData.name} onChange={(e) => setOrderData({...orderData , name:e.target.value})}  />
                    </div>
              <div className="sm:col-span-3">
                    <label htmlFor="number" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">
                        رقم الجوال:
                     </label>
                         <input
                            type="tel"
                            name="number"
                            id="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="+966 (XXXXXXXXX) "
                            dir="ltr"
                            pattern="[0-9]{10}"
                            value = {orderData.pho}
                            onChange={(e) => setOrderData({...orderData , pho:e.target.value})} 
                            required
                        />
                </div>
                    
              <div>
                  <label htmlFor="category1" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">اختر نوع الماده المعاد تدويرها :</label>
                  <select id="category1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"required
                    value={orderData.category1} onChange={(e) => setOrderData({...orderData , category1:e.target.value})}  >
                     <option value="" >اختر</option>
                      <option value="بلاستيك" >بلاستيك</option>
                      <option value="ورق"> ورق</option>
                      <option value="زجاج">زجاج</option>
                  </select>
              </div>
              
              <div>
                  <label htmlFor="item1Name" className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">اسم الماده :</label>
                  <select id="item1Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"required
                    value={orderData.item1Name} onChange={(e) => setOrderData({...orderData , item1Name:e.target.value})}  >
                     <option value="" >اختر</option>
                      <option value="قاروره ماء" >قاروره ماء</option>
                      <option value="كتب"> كتب</option>
                      <option value="كاس">كاس</option>
                      <option value="صحون">صحون</option>
                      <option value="اكواب">اكواب</option>
                      <option value="مناديل">مناديل</option>
                      <option value="ملاعق">ملاعق</option>
                      <option value="علب">علب</option>
                      <option value="كرتون">كرتون</option>
                      <option value="اكياس">اكياس</option>

                  </select>

                    </div> 
              <div>
                  <label htmlFor="item1Count" className="block mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-black">الكميه :</label>
                  <input type="number" name="item1Count" id="item1Count" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12"
                     required min="10"  value={orderData.item1Count} onChange={(e) => setOrderData({...orderData , item1Count:parseInt(e.target.value)})}  />
              </div> 
              
              <div>
                  <label htmlFor="category2" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">اختر ماده اخرى : (اختياري)</label>
                  <select id="category2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={orderData.category2} onChange={(e) => setOrderData({...orderData , category2:e.target.value})}  >
                   <option value="" >اختر</option>
                      <option value="بلاستيك" >بلاستيك</option>
                      <option value="ورق"> ورق</option>
                      <option value="زجاج">زجاج</option>
                  </select>
              </div>
              
              <div>
                  <label htmlFor="item2Name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">اسم الماده :</label>
                  <select id="item2Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={orderData.item2Name} onChange={(e) => setOrderData({...orderData , item2Name:e.target.value})}  >
                     <option value="" >اختر</option>
                      <option value="قاروره ماء" >قاروره ماء</option>
                      <option value="كتب"> كتب</option>
                      <option value="كاس">كاس</option>
                      <option value="صحون">صحون</option>
                      <option value="اكواب">اكواب</option>
                      <option value="مناديل">مناديل</option>
                      <option value="ملاعق">ملاعق</option>
                      <option value="علب">علب</option>
                      <option value="كرتون">كرتون</option>
                      <option value="اكياس">اكياس</option>

                  </select>
                    </div> 
              <div>
                  <label htmlFor="item2Count" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">الكميه :</label>
                  <input type="number" name="item2Count" id="item2Count" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12"
                    min="10" value={orderData.item2Count} onChange={(e) => setOrderData({...orderData , item2Count:parseInt(e.target.value)})}  />
                    </div> 
              <div>
                  <label htmlFor="category3" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">اختر ماده اخرى : (اختياري)</label>
                  <select id="category3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     value={orderData.category3} onChange={(e) => setOrderData({...orderData , category3:e.target.value})}  >
                     <option value="" >اختر</option>
                      <option value="بلاستيك" >بلاستيك</option>
                      <option value="ورق"> ورق</option>
                      <option value="زجاج">زجاج</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="item3Name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">اسم الماده :</label>
                  <select id="item3Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={orderData.item3Name} onChange={(e) => setOrderData({...orderData , item3Name:e.target.value})}  >
                     <option value="" >اختر</option>
                      <option value="قاروره ماء" >قاروره ماء</option>
                      <option value="كتب"> كتب</option>
                      <option value="كاس">كاس</option>
                      <option value="صحون">صحون</option>
                      <option value="اكواب">اكواب</option>
                      <option value="مناديل">مناديل</option>
                      <option value="ملاعق">ملاعق</option>
                      <option value="علب">علب</option>
                      <option value="كرتون">كرتون</option>
                      <option value="اكياس">اكياس</option>

                  </select>
                    </div> 
              <div>
                  <label htmlFor="item3Count" className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">الكميه :</label>
                  <input type="number" name="item3Count" id="item3Count" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12"
                    min="10" value={orderData.item3Count} onChange={(e) => setOrderData({...orderData , item3Count:parseInt(e.target.value)})}  />
                    </div> 
 

            
          </div>
        <h1 className='text-xl font-medium text-gray-900 '>الرجاء تحديد موقعك:</h1>
        <LoadScript
           googleMapsApiKey='AIzaSyCS4sSfKKZs2OZEgzZDZoaH6sMcPvT-arE'>
          <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={userLocation ? 15 : 12}
              center={userLocation || defaultCenter}
              onClick={handleMapClick}
             >
            {userLocation && <Marker position={userLocation} />}
            </GoogleMap>
          </LoadScript>

           <p>{placeName}</p>

          <button type="submit" className="flex flex-1 w-full justify-center items-center  px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-[#3D96D1] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-[#9BE8D8]"
          >
              تقديم
          </button>
      </form>
  </div>
</section>
</div>
</div>
  )
}

export default OrderRequestContent