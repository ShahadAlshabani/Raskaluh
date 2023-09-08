import axios from "axios";
import { useState } from "react"
import Swal from "sweetalert2";

type userInfo = {
  userName: string;
  email:string;
  password:string;
}

export const SignUp = () => {
  const [form, setform] = useState<userInfo>({
    userName: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("");

  const signUp = () =>{
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
      axios.post('https://64facb17cb9c00518f7a31dc.mockapi.io/users', {
        userName: form.userName,
        email: form.email,
        password: form.password,
      })
      .then(function (response) {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '!تم التسجيل بنجاح',
            showConfirmButton: false,
            timer: 1500
            
          }).then((result) => {
            if (result.dismiss) {
                window.location.href="/login";
            } 
            
          })
         

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  return (
    <div>

        <div className=" bg-gradient-to-r from-white to-[#78C1F3]  text-right h-screen">
  
             <div className="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-md xl:p-0 dark:bg-white ">
                    <div className="p-6 space-y-4 md:space-y-6 ">
                    <img className="h-20" src="../src/assets/logo.png" alt="logo"/>
                         <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900  dark:text-[#78C1F3] ">
                         إنشاء حساب
                         </h1>
                     <div>
                      <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3] ">اسم المستخدم</label>
                      <input type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right" placeholder="اكتب اسمك هنا" 
                      value={form.userName}  onChange={(e) => setform({...form , userName:e.target.value})} />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3] ">ايميلك</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right" placeholder="name@company.com"
                      value={form.email}  onChange={(e) => setform({...form , email:e.target.value})}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3]">الرقم السري</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right" 
                      value={form.password}  onChange={(e) => setform({...form , password:e.target.value})}/>
                  </div>
                  <div className="text-red-300">{error}</div>
                  <button type="button" className="w-full text-lg text-white bg-[#78C1F3] hover:bg-[#9BE8D8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={signUp}>متابعه</button>
                  <p className="text-lg font-light text-[#78C1F3] ">
                      عندك حساب؟ <a href="/login" className="font-medium hover:underline ">تسجيل دخول</a>
                  </p>
          </div>
      </div>

  </div>
</div>




    </div>
  )
}