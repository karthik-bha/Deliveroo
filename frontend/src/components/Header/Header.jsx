import React from 'react'
import './header.css'
const Header = () => {
    return (
      <div className='font-[Outfit]'>
        <div className="md:relative h-[45vh] bg-[url('/header_img.png')] max-w-[1200px] bg-cover bg-no-repeat bg-center mx-auto  my-4">
          <div className="mx-auto text-center md:text-left md:m-12 text-white flex flex-col gap-6 md:gap-10 bottom-0 md:absolute max-w-[45%] header-content">
            <h1 className="pt-12 md:py-0 text-[32px] md:text-6xl font-semibold">
              Order your favourite food here
            </h1>
            <p className="text-[14px] md:text-2xl font-medium">
              Choose from a wide range of dishes
            </p>
            <div>
              <button className="text-[12px] md:text-[16px] py-2 px-4 md:py-4 md:px-12 bg-white text-black rounded-full">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Header
