import axios from "axios";
import { useState } from "react"
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

type userInfo = {
  userName: string;
  email:string;
  password:string;
}

export const LogIn = () => {
  const [form, setform] = useState<userInfo>({
    userName: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("");

  const logIn = () =>{
    axios.get('https://64facb17cb9c00518f7a31dc.mockapi.io/users')
    .then(function (response) {
      console.log(response);
      setform(response.data)
      const correctAccount = response.data.find(
          (account: userInfo) => account.userName === form.userName && account.password === form.password
        );

        if(correctAccount){
            Swal.fire({
                icon: 'success',
                title: `${correctAccount.userName} مرحبا بك`,
                showConfirmButton: false,
                timer: 1500
                
              }).then((result) => {
                if (result.dismiss) {
                    localStorage.setItem('loginStatus', 'true');
                    localStorage.setItem('username',correctAccount.userName);
                    window.location.href="/";

                } 
                
              })

              
           }
      else{
        setError('!البيانات المدخله غير صحيحه حاول مره اخرى');
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  
  }
  return (
    <div>

        <div className=" bg-gradient-to-r from-white to-[#78C1F3]  text-right h-screen">
  
             <div className="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-md xl:p-0 dark:bg-white ">
                    <div className="p-6 space-y-4 md:space-y-6 ">
                    <img className="h-20" src="../src/assets/logo.png" alt="logo"/>
                         <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900  dark:text-[#78C1F3] ">
                         تسجيل دخول
                         </h1>
                     <div>
                      <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3] ">اسم المستخدم</label>
                      <input type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right" placeholder="اكتب اسمك هنا" 
                      value={form.userName}  onChange={(e) => setform({...form , userName:e.target.value})} />
                  </div>
              
                  <div>
                      <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3]">الرقم السري</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right" 
                      value={form.password}  onChange={(e) => setform({...form , password:e.target.value})}/>
                  </div>
                  <div className="text-red-300">{error}</div>
                  <button type="button" className="w-full text-lg text-white bg-[#78C1F3] hover:bg-[#9BE8D8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={logIn}>تسجيل دخول</button>
                  <p className="text-lg font-light text-[#78C1F3] ">
                    ليس لديك حساب؟<a href="/signUp" className="font-medium hover:underline mr-2">تسجيل </a>
                  </p>
          </div>
      </div>

  </div>
</div>




    </div>
  )
}