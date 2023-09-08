import CardsHome from "../components/CardsHome"
import { Footer } from "../components/Footer"
import 'flowbite';
import logo from '../assets/logo.png'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'


import {  useState } from "react";

const Home = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        emailjs.sendForm('service_rsq949j', 'template_0lj1hq6', e.target as HTMLFormElement, '2HxJgm5GRcBV66ZDS')
          .then((result) => {
            console.log(result.text);
            Swal.fire({
                icon: 'success',
                title: '!تم ارسال الايميل بنجاح',
                showConfirmButton: false,
                timer: 1500
              })
          }, (error) => {
            console.log(error.text);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '!حدث خطأ في ارسال الايميل',
              })
          });
      
        // Reset form fields
        setEmail('');
        setSubject('');
        setMessage('');
      };
  return (
    <div>
          <nav className="fixed top-0 z-20 w-full bg-white border-gray-200 dark:bg-white font-mono">
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
         <div className="flex md:order-1">
             <a href='/login' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#78C1F3] dark:hover:bg-[#9BE8D8] dark:focus:ring-blue-800" >تسجيل الدخول</a>
                 <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#9BE8D8] dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                 <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                 </svg>
             </button>
         </div>

            <a href="/" className="flex items-center md:order-3">
                <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-[#9BE8D8] mr-3 hover:text-[#78C1F3]">رسكله</span>
                <img src={logo} className="h-12 mr-3"  />
            </a>
      
         <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-cta">
             <ul className="flex flex-col-reverse text-xl font-medium p-4  ml-20 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 text-right ">
                <li>
                 <a href="#contact-us" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-[#9BE8D8] dark:text-[#9BE8D8] hover:text-[#78C1F3]  md:dark:hover:bg-transparent dark:border-gray-700 text-right">تواصل معنا</a>           
                 </li>
                <li>
                 <a href="#about-us" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-[#9BE8D8] dark:text-[#9BE8D8] hover:text-[#78C1F3]  md:dark:hover:bg-transparent dark:border-gray-700 text-right">عنا</a>           
                 </li>
                 <li>
                 <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-[#9BE8D8] dark:text-[#9BE8D8]  hover:text-[#78C1F3]  md:dark:hover:bg-transparent dark:border-gray-700 text-right">الصفحه الرئيسيه</a>
                 </li>          
            </ul>
             </div>
         </div>
    </nav>
    <img src="../src/assets/bannar.png" className="w-full h-64 mt-16">
    </img>
    <div className=" mb-36">

     <CardsHome></CardsHome>
     <div className="dark:bg-[#78C1F3] w-full h-auto  md:h-96 flex justify-end font-mono ">
    <div className="flex flex-col justify-center md:text-xl text-right  md:mr-20 sm:text-sm">
    <ul className="flex flex-col sm:mt-5 sm:mb-5">
      <li className="bg-white rounded-full inline-block px-4 py-5 mb-2 hover:bg-[#9BE8D8] cursor-pointer hover:scale-110">شارك معنا في الحفاظ على البيئة لتكن مسؤوليتنا الاجتماعية</li>
      <li className="bg-white rounded-full inline-block px-4 py-5 mb-2 hover:bg-[#9BE8D8] cursor-pointer hover:scale-110">بمساهمتك معنا ستربح نقاطًا تستطيع استخدامها كخصم حصري في مواقع التسوق</li>
      <li className="bg-white rounded-full inline-block px-4 py-5 mb-2 hover:bg-[#9BE8D8] cursor-pointer hover:scale-110">المساهمة في عملية إعادة التدوير لتصبح أكثر سهولة ومرونة</li>
    </ul>
     </div>
    <div className="flex flex-col justify-center rounded-r-lg rounded-full bg-white p-4 md:p-16 cursor-pointer hover:scale-110">
    <h1 className="text-3xl font-mono font-bold text-center" >ساهم معنا</h1>
    </div>
    </div>

    <div className="dark:bg-[#9BE8D8] w-full h-auto  md:h-96 flex justify-start font-mono mb-10 " id="about-us" >
    <div className="flex flex-col justify-center rounded-l-lg rounded-full bg-white p-16 md:p-20 cursor-pointer hover:scale-110 " >
    <h1 className="text-3xl font-mono font-bold text-center ">عنا</h1>
    </div>
    <div className="flex flex-col justify-center md:text-xl text-right ml-4 md:ml-20 sm:text-sm sm:mt-5 sm:mb-5">
    <div >
    <p className="bg-white rounded-l inline-block px-10 py-10 mb-2"><b>رسكله</b> هو موقع يهدف للسماح للأشخاص بإعادة التدوير من خلال توفيرهم بالورق والبلاستيك والزجاج. يعمل الموقع كمنصة تجمع بين الأفراد الذين يرغبون في التخلص من موادهم القابلة للتدوير.
من خلال تسهيل عملية إعادة التدوير، يساهم "رسكله" في تقليل النفايات والحد من استهلاك الموارد الطبيعية. يعمل الموقع على تعزيز ثقافة الاستدامة والحفاظ على البيئة من خلال تشجيع المشاركة الفعّالة في عملية إعادة التدوير وتعزيز التعاون بين  
الأفراد</p>
    </div> 
     </div>
   
    </div>
     <div className="bg-white dark:bg-white font-mono" id="contact-us">
         <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md" >
        <h2 className="mb-4 mt-2 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-black" >تواصل معنا</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl" >نسعد بتلقي استفساراتكم</p>
         <form className="space-y-8 bg-[#78C1F3] rounded p-5" onSubmit={sendEmail}>
          <div>
              <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-right" >ايميلك</label>
              <input type="email" id="email" name="user_email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light text-right" placeholder="name@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
          </div>
          <div>
              <label htmlFor="subject" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-right">الموضوع</label>
              <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light text-right" placeholder="عنوان الموضوع" value={subject} onChange={(e) => setSubject(e.target.value)} name="subject"required/>
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-right">رسالتك</label>
              <textarea id="message" rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-primary-500 dark:focus:border-primary-500 text-right" placeholder="اترك تعليق" value={message} onChange={(e) => setMessage(e.target.value)} name="message"required></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-lg font-medium text-center text-black rounded-lg bg-white sm:w-fit hover:bg-[#78C1F3] focus:ring-4 focus:outline-none focus:ring-primary-300 ">ارسل</button>
         </form>
    </div>
    </div>
     </div>
     <Footer></Footer>

    </div>
  )
}

export default Home