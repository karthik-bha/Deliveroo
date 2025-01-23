import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotal, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    // console.log(data);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotal() + 2,
    }
    // console.log(orderData);
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {headers:{token}});

      if(response.data.success){
        const {session_url}=response.data;
        window.location.replace(session_url);
      }else{
        alert("Error");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='max-w-[1200px] mx-auto flex justify-between mt-16 '>
      <div className='mb-12'>
        <h2 className='text-4xl font-semibold mb-6'>Delivery Information</h2>
        <form className='max-w-[500px] flex flex-col my-4 gap-4' >
          <div className='flex justify-between gap-2'>
            <input type="text" required onChange={handleChange} name="fname" placeholder="First name" className='p-2 border border-slate-400 rounded-md' />
            <input type="text" required onChange={handleChange} name="lname" placeholder="Last name" className='p-2 border border-slate-400 rounded-md' />
          </div>
          <input type="email" required onChange={handleChange} name="email" placeholder="Email" className='p-2 border border-slate-400 rounded-md' />
          <input type='text' required onChange={handleChange} name="street" placeholder="Street" className='p-2 border border-slate-400 rounded-md' />
          <div className='flex justify-between gap-2'>
            <input type="text" required onChange={handleChange} name="city" placeholder='City' className='p-2 border border-slate-400 rounded-md' />
            <input type="text" required onChange={handleChange} name="state" placeholder='State' className='p-2 border border-slate-400 rounded-md' />
          </div>
          <div className='flex justify-between gap-2'>
            <input type="text" required onChange={handleChange} name="zipcode" placeholder='Zip code' className='p-2 border border-slate-400 rounded-md' />
            <input type="text" required onChange={handleChange} name="country" placeholder='Country' className='p-2 border border-slate-400 rounded-md' />
          </div>
          <input type="tel" required onChange={handleChange} name="phone" placeholder='Phone number' className='p-2 border border-slate-400 rounded-md' />
        </form>
      </div>
      <div className='flex flex-col gap-4'>
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
            <p>${getTotal() + 2}</p>
          </div>

        </div>
        <button onClick={handleSubmit} className='bg-[tomato] px-6 py-2 rounded-md text-white hover:text-black'>Place Order</button>
      </div>
    </div>
  )
}

export default PlaceOrder
