import React from 'react'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='justify-between flex p-4 max-w-[1500px] mx-auto items-center'>
      <div>
        <h1 className="font-bold text-2xl md:text-4xl hover:cursor-pointer">
          Deliveroo.
        </h1>
        <p className='text-red-500'>ADMIN PANEL</p>
      </div>
      <img src={assets.profile_image} className='w-[50px] h-[50px]' alt="pfp" />
    </div>
  )
}

export default Navbar