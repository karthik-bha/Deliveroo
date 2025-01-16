import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className=' h-[100vh]  pl-4 md:pl-12 pt-12 border-r flex flex-col gap-4 items-center md:items-end  border-slate-400 max-w-[20vw]'>
      <NavLink to="/add" className={({isActive})=>`flex gap-2 hover:cursor-pointer  border-l border-b border-t  border-slate-400 p-2 ml-1 rounded-l-md md:w-[150px] justify-start ${isActive? 'text-red-500':''}`}>
        <img src={assets.add_icon} alt="add" width={27} />
        <p className='hidden md:block'>Add Items</p>
      </NavLink>
      <NavLink to="/list"  className={({isActive})=>`flex gap-2 hover:cursor-pointer border-l border-b border-t  border-slate-400 p-2 ml-1 rounded-l-md md:w-[150px] justify-start ${isActive? 'text-red-500':''}`}>
        <img src={assets.order_icon} alt="list items"  width={27}/>
        <p className='hidden md:block'>List Items</p>
      </NavLink>
      <NavLink to="/order"  className={({isActive})=>`flex gap-2 hover:cursor-pointer border-l border-b border-t  border-slate-400 p-2 ml-1 rounded-l-md md:w-[150px] justify-start  ${isActive? 'text-red-500':''}`}>
        <img src={assets.order_icon} alt="order"  width={27}/>
        <p className='hidden md:block'>Orders</p>
      </NavLink>
    </div >
  )
}

export default Sidebar