import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react'
import{AiFillEdit} from 'react-icons/ai'
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import {
    Drawer,
    IconButton,
  } from "@material-tailwind/react";
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import Swal from 'sweetalert2';


type userInfo = {
    userName: string;
    email:string;
    password:string;
    img:string;
  }
function Profile() {

    const {id} = useParams()
    const [getInfo, setgetInfo] = useState<userInfo[]>([]);

    const [form, setform] = useState<userInfo>({
      userName: "",
      email: "",
      password: "",
      img:""
    })

    React.useEffect(() => {
            getData();
    }, []);
        
    const getData = () => {
            axios
              .get('https://64facb17cb9c00518f7a31dc.mockapi.io/users')
              .then((response) => {
                const users = response.data;
                  const specificUser = users.find((user: { id: string | undefined; }) => user.id === id);
                setgetInfo([specificUser]); 
                setform(specificUser);
                
                }
              )
              
    };
    const [imageUrl, setImageUrl] = useState('');

    const imgClick = () => {
        axios.put(`https://64facb17cb9c00518f7a31dc.mockapi.io/users/${id}`, {
        img: imageUrl,
      }) .then(() => {
        getData();

       
         });   
     }
     const [open, setOpen] = React.useState(false);
     const openDrawer = () => setOpen(true);
     const closeDrawer = () => setOpen(false);
   

   
      const [error, setError] = useState("");
     const edit = () =>{
        if(form.userName == "" || form.email == "" || form.password == ""){
            setError("يجب عليك ملء جميع الحقول");
         
      
          }
          else if (!/^[A-Za-z0-9!@#$%^&*()]+$/.test(form.userName)){
              setError("اسم المستخدم خاطئ");
          } else if(form.userName.length<6) {
              setError(" اسم المستخدم يجب ان يكون اكثر من ٦ أحرف");
          }else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(form.email)) {
              setError("الايميل خاطئ");
          } else if (!/^[A-Za-z0-9!@#$%^&*()]+$/.test(form.password)){
              setError("كلمه المرور خاطئ");
          } else if(form.password.length<6) {
              setError(" كلمه المرور يجب ان تكون اكثر من ٦ أحرف");
          }else{
            Swal.fire({
                title: 'هل انت متأكد من المتابعه؟',
                showCancelButton: true,
                confirmButtonColor: '#9BE8D8',
                cancelButtonColor: '#3085d6',
                confirmButtonText: ' نعم',
                cancelButtonText: 'لا',
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`https://64facb17cb9c00518f7a31dc.mockapi.io/users/${id}`, {
                        userName: form.userName,
                        email: form.email,
                        password: form.password,
                      }).then(() => {
                        getData();
                
                       
                    });
                       
                }
              })

              setform({
                userName: "",
                email: "",
                password: "",
                img: ""
              }); 
              setError("");
            
            }
      
        }
    
  return (
    <div >
        <div className=" text-right h-screen flex justify-center"  style={{
           backgroundImage: "url('../public/bgimage.svg')",
          textAlign: 'right',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          backgroundRepeat: 'no-repeat'
      }}>  
        {getInfo.map((user) => {
         return (
            
            <div key={user.userName}>
                

                    
       
              <div className="flex flex-col  justify-center items-center  bg-white rounded-lg shadow-xl  border-t-4 border-blue-200 w-fit  h-fit mt-36 p-52 md:mr-56 md:ml-10 " dir='rtl'>
              <div className="-mt-72">
                    <Popover placement="bottom" >
                    <PopoverHandler>
                    <div className="relative " >
                    <div className="w-40 h-40 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500" >
                        <img
                         className="hidden group-hover:block w-12 "
                         src="https://www.svgrepo.com/show/33565/upload.svg"
                         alt=""
                        />
                    </div>
                    {user.img ? (
                       <img
                      src={user.img}
                      className="w-40 h-40 border-t-4 border-blue-200 rounded-full"
                      alt="User Image"
                    />
                    ) : (
                    <img
                      src="https://img.freepik.com/premium-vector/recycle-icon-symbol-vector-illustration_77417-300.jpg"
                       className="w-40 h-40 border-t-4 border-blue-200 rounded-full"
                       alt="Default Image"
                     />
                    )}
              </div>
              
              </PopoverHandler>
                    <PopoverContent dir='rtl' className=' w-36 lg:w-72'>
                         <Typography variant="h6" color="blue-gray" className="mb-6">
                          ادخل رابط الصوره
                         </Typography>
                         <div className="flex gap-2 flex-wrap">
                           <input placeholder="URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className='w-28 lg:w-36'  />
                           <Button variant="gradient" className='bg-[#78C1F3]' onClick={imgClick}>ادخل</Button>
                         </div>
                       </PopoverContent>
                    </Popover>
              </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl">{user.userName}</p>
                    </div>
                    <p className="text-gray-700">{user.email}</p>
                    
                    
                <AiFillEdit className="w-5 h-5 mb-3 cursor-pointer" onClick={openDrawer} />
  

                    <h4 className="text-2xl text-gray-900 font-bold lg:text-3xl">المعلومات</h4>
                    <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2 text-lg lg:text-lg">
                            <span className="font-bold lg:text-2xl ml-3 ">اسم المستخدم:</span>
                            <span className="text-gray-700">{user.userName}</span>
                        </li>
                        <li className="flex border-b py-2 text-lg lg:text-lg">
                            <span className="font-bold lg:text-2xl ml-3">العنوان الالكتروني:</span>
                            <span className="text-gray-700 ">{user.email}</span>
                        </li>
               
                 
                    </ul>
                    
                    
  
            </div>
            
            <Drawer open={open} onClose={closeDrawer} dir='rtl' className='w-52 lg:w-full '>
                <div className="mb-2 flex items-center justify-between p-4 mt-5 ">
                <Typography variant="h3" color="blue-gray">
                تعديل البيانات
                </Typography>
                <IconButton variant="text" color="blue-gray" onClick={closeDrawer} >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 -mt-3 "
                 >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </IconButton>
                    </div>
                     <form className="flex flex-col gap-6 p-4">
                     <div>
                        <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3] ">اسم المستخدم</label>
                        <div className="relative">
                        <input type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-10" placeholder="اكتب اسمك هنا" 
                             value={form.userName}  onChange={(e) => setform({...form , userName:e.target.value})} />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <FaUserCircle className="text-gray-500"></FaUserCircle>
                             </span>
                         </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3] ">ايميلك</label>
                      <div className="relative">
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-10" placeholder="name@company.com"
                      value={form.email}  onChange={(e) => setform({...form , email:e.target.value})}/>
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <MdOutlineAlternateEmail className="text-gray-500"/>
                      </span>
                      </div>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3]">الرقم السري</label>
                      <div className="relative">
                      <input type= 'password' name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-10" 
                      value={form.password}  onChange={(e) => setform({...form , password:e.target.value}) }/>
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <RiLockPasswordFill className="text-gray-500"/>
                      </span>
                       
            
                      </div>
                  </div>
                  <div className="text-red-300">{error}</div>
                         <Button className="w-full text-lg text-white bg-[#78C1F3] hover:bg-[#9BE8D8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                         onClick={edit}>تعديل</Button>
                     </form>
                 </Drawer>
            </div>
            
            )
         })}
      </div>

    </div>
    
  )
             
}

export default Profile