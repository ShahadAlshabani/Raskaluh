import axios from "axios";
import { useState } from "react"
import Swal from "sweetalert2";
import {FaUserCircle} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import logo from '../assets/logo.png'

type UserInfo = {
  userName: string;
  email: string;
  password: string;
};

export const LogIn = () => {



  const [form, setForm] = useState<UserInfo>({
    userName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const logIn = () => {
    axios
      .get('https://64facb17cb9c00518f7a31dc.mockapi.io/users')
      .then(function (response) {
        console.log(response);
        const matchedAccount = response.data.find(
          (account: UserInfo) =>
            account.userName === form.userName && account.password === form.password
        );

        if (matchedAccount) {
          Swal.fire({
            icon: 'success',
            title: `${matchedAccount.userName} مرحبا بك`,
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (!result.isConfirmed) {
              localStorage.setItem('id', matchedAccount.id);
              if(matchedAccount.role === 'Admin'){
                window.location.href = `/admin/${matchedAccount.id}`;
                localStorage.setItem('isLoggedAdmin', 'true');
              }else {
                  window.location.href = `/user/${matchedAccount.id}`;
                  localStorage.setItem('isLogged', 'true');

                }
            }
          });
        } else {
          setError('!البيانات المدخلة غير صحيحة حاول مرة أخرى');
        }
      });
  };

  return (
    <div>
      <div className=" text-right h-screen flex justify-center"  style={{
           backgroundImage: "url('../src/assets/image 1.svg')",
          textAlign: 'right',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
      }}>
        <div className="flex flex-row items-center justify-center w-11/12 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-md xl:p-0 dark:bg-white">
            <div className="p-6 space-y-4 md:space-y-6">
              <a href="/">
                <img className="h-20" src={logo} alt="logo" />
              </a>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-[#3d96d1]">
                تسجيل دخول
              </h1>
              <div>
                <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3]">
                  اسم المستخدم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-10"
                    placeholder="اكتب اسمك هنا"
                    value={form.userName}
                    onChange={(e) => setForm({ ...form, userName: e.target.value })}
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <FaUserCircle className="text-gray-500" />
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-[#78C1F3]">
                  الرقم السري
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-10"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                 <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <RiLockPasswordFill className="text-gray-500" />
                  </span>
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center focus:outline-none text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>
              <div className="text-red-300">{error}</div>
              <button
                type="button"
                className="w-full text-lg text-white bg-[#78C1F3] hover:opacity-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={logIn}
              >
                تسجيل دخول
              </button>
              <p className="text-lg font-light text-[#3d96d1] ">
                ليس لديك حساب؟<a href="/signUp" className="font-medium hover:underline mr-2">تسجيل </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};