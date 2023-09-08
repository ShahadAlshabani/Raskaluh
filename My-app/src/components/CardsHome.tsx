
const CardsHome = () => {
  return (
    <div>

<div className="container my-12 mx-auto px-4 md:px-12 ">
  <h1 className="text-center text-2xl font-bold mb-10">اهم الموارد في اعاده التدوير</h1>
  <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center gap-6  ">
  <div className=" w-52 h-52 rounded-full overflow-hidden shadow-lg flex flex-col justify-center items-center hover:scale-75">
  <img className="w-28 h-28" src="../src/assets/recycling-glass.png" />
  <div className="px-6 py-4">
    <div className="font-bold text-lg mb-2 text-center">زجاج</div>

  </div>

</div>
<div className=" w-52 h-52 rounded-full overflow-hidden shadow-lg flex flex-col justify-center items-center hover:scale-75">
  <img className="w-28 h-28" src="../src/assets/paper.png" />
  <div className="px-6 py-4">
    <div className="font-bold text-lg mb-2 text-center">ورق</div>

  </div>

</div>
<div className=" w-52 h-52 rounded-full overflow-hidden shadow-lg flex flex-col justify-center items-center hover:scale-75">
  <img className="w-28 h-28" src="../src/assets/recycle-plastic.png"  />
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