import React from 'react'
import './header.css'
const Header = () => {
    return (
      <div className='font-[Outfit]' id="Header">
        <div className="relative h-[70vh] max-h-[600px] rounded-md bg-[url('/header_img.png')] 
        max-w-[1200px] bg-cover bg-no-repeat bg-center mx-auto  my-4">
          <div className=" absolute bottom-12 translate-x-[25%] md:translate-x-[15%] text-white 
          flex flex-col gap-6  max-w-[50%] header-content">
            <h1 className="text-[32px] md:text-6xl font-semibold">
              Order your favourite food here
            </h1>
            <p className="text-[14px] md:text-2xl font-medium">
              Choose from a wide range of dishes
            </p>
            <div>
              <button className="text-[12px] md:text-[16px] py-2 px-4 md:py-4 md:px-12 
              bg-white text-black rounded-full hover:font-semibold">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Header
