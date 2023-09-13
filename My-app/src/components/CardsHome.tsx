
const CardsHome = () => {
  return (
    <div>

<div className="container my-12 mx-auto px-4 md:px-12 relative -top-16 md:-top-36 ">
  <h1 className="text-center text-2xl text-gray-500 font-bold mb-10">اهم الموارد في اعاده التدوير</h1>
  <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center gap-6  ">
  <div className=" w-36 h-36 rounded-full overflow-hidden shadow-lg flex flex-col justify-center items-center hover:scale-75
 md:w-52 md:h-52 ">
  <img className="w-52 h-52 rounded-full" src="https://www.conserve-energy-future.com/wp-content/uploads/2021/07/broken-wine-glass.jpg" />
  <div className="px-6 py-4">
    <div className="  font-bold text-lg mb-2 text-center">زجاج</div>

  </div>

</div>
<div className=" w-36 h-36 rounded-full overflow-hidden shadow-lg flex flex-col justify-center items-center hover:scale-75 md:w-52 md:h-52">
  <img className="w-52 h-52 rounded-full" src="https://www.wastepaperbrokers.com/wp-content/uploads/2023/04/waste-paper-1.jpg" />
  <div className="px-6 py-4">
    <div className="font-bold text-lg mb-2 text-center">ورق</div>

  </div>

</div>
<div className=" w-36 h-36  rounded-full overflow-hidden shadow-lg flex flex-col justify-center items-center hover:scale-75 md:w-52 md:h-52">
  <img className="w-52 h-52 rounded-full" src="https://dutchreview.com/wp-content/uploads/pexels-anna-shvets-5218009-e1610098110341.jpg"  />
  <div className="px-6 py-4">
    <div className="font-bold text-lg mb-2 text-center">بلاستيك</div>

  </div>

</div>


  </div>
</div>

    </div>
  )
}

export default CardsHome