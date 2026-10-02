import Image from 'next/image'

const ShopBanner = () => {
  return (
    <div className=" relative w-full overflow-hidden rounded-2xl ">
      <Image
        src="/images/shopBannerFav.png" 
        alt="Shop Banner"
        width={1200} 
        height={675}  
        priority
        className="w-full h-auto object-contain" 
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-4 text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Exclusive Gadget Collection
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Purchase the products of your choice.
            </h2>
            <p className="text-xs sm:text-sm mt-2 text-gray-200">
              Upgrade your lifestyle with our premium accessories
            </p>
          </div>
    </div>
  )
}

export default ShopBanner