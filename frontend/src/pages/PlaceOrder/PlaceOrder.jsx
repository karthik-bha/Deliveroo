import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const {getTotal}= useContext(StoreContext);
  return (
    <div className='max-w-[1200px] mx-auto flex justify-between mt-16 '>
      <div className='mb-12'>
        <h2 className='text-4xl font-semibold mb-6'>Delivery Information</h2>
        <form className='max-w-[500px] flex flex-col my-4 gap-4'>
          <div className='flex justify-between gap-2'>
            <input type="text" id="fname" placeholder="First name" className='p-2 border border-slate-400 rounded-md'/>
            <input type="text" id="lname" placeholder="Last name" className='p-2 border border-slate-400 rounded-md'/>
          </div>
          <input type="email" id="email" placeholder="Email" className='p-2 border border-slate-400 rounded-md'/>
          <input type='text' id="address" placeholder="Address" className='p-2 border border-slate-400 rounded-md'/>
          <div className='flex justify-between gap-2'>
            <input type="text" id="city"  placeholder='City' className='p-2 border border-slate-400 rounded-md'/>
            <input type="text" id="state" placeholder='State'  className='p-2 border border-slate-400 rounded-md'/>
          </div>
          <div className='flex justify-between gap-2'>
            <input type="text" id="zipcode" placeholder='Zip code'  className='p-2 border border-slate-400 rounded-md'/>
            <input type="text" id="country" placeholder='Country' className='p-2 border border-slate-400 rounded-md'/>
          </div>
          <input type="tel" id="phone" placeholder='Phone number' className='p-2 border border-slate-400 rounded-md'/>
        </form>
      </div>
      <div className="flex flex-col md:w-[350px] lg:w-[500px] ">
            <h2 className="text-3xl font-bold mb-6">Cart Total</h2>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${getTotal()}</p>
            </div>
            <hr className="bg-black h-[1px] my-1 border-none" />
            <div className="flex justify-between">
              <p>Delivery Fee </p>
              <p>${2}</p>
            </div>
            <hr className="bg-black h-[1px] my-1 border-none" />
            <div className="flex justify-between">
              <p>Total</p>
              <p>${getTotal()+2}</p>
            </div>
          </div>
    </div>
  )
}

export default PlaceOrder
