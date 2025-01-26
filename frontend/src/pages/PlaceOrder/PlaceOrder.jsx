import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Only check if fields exist, no format validation
    if (!data.fname.trim()) newErrors.fname = "First name is required";
    if (!data.lname.trim()) newErrors.lname = "Last name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.street.trim()) newErrors.street = "Street address is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.state.trim()) newErrors.state = "State is required";
    if (!data.zipcode.trim()) newErrors.zipcode = "Zip code is required";
    if (!data.country.trim()) newErrors.country = "Country is required";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validateForm()) return;
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (err) {
      // console.log(err);
      toast.error("Error placing orders");
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast.error("User must be logged in to order!");
    } else if (getTotal() === 0) {
      navigate("/cart");
      toast.error("A minimum of 1 item must be added to order!");
    }
  })
  return (
    <div className='min-h-[80vh] mx-2 my-12 max-w-[1200px] items-center md:mx-auto flex flex-col md:flex-row md:justify-between  '>
      <div className='mb-12 '>
        <h2 className='text-4xl font-semibold mb-6'>Delivery Information</h2>
        <form className='max-w-[500px] flex flex-col my-4 gap-4' >
          <div className='flex flex-col md:flex-row md:justify-between gap-2'>
            <input type="text" required onChange={handleChange} name="fname" placeholder="First name" className='p-2 border border-slate-400 rounded-md' />
            {errors.fname && <span className="text-red-500 text-sm">{errors.fname}</span>}
            <input type="text" required onChange={handleChange} name="lname" placeholder="Last name" className='p-2 border border-slate-400 rounded-md' />
            {errors.lname && <span className="text-red-500 text-sm">{errors.lname}</span>}
          </div>
          <input type="email" required onChange={handleChange} name="email" placeholder="Email" className='p-2 border border-slate-400 rounded-md' />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          <input type='text' required onChange={handleChange} name="street" placeholder="Street" className='p-2 border border-slate-400 rounded-md' />
          {errors.street && <span className="text-red-500 text-sm">{errors.street}</span>}
          <div className='flex flex-col md:flex-row md:justify-between gap-2'>
            <input type="text" required onChange={handleChange} name="city" placeholder='City' className='p-2 border border-slate-400 rounded-md' />
            {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            <input type="text" required onChange={handleChange} name="state" placeholder='State' className='p-2 border border-slate-400 rounded-md' />
            {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
          </div>
          <div className='flex flex-col md:flex-row md:justify-between gap-2'>
            <input type="text" required onChange={handleChange} name="zipcode" placeholder='Zip code' className='p-2 border border-slate-400 rounded-md' />
            {errors.zipcode && <span className="text-red-500 text-sm">{errors.zipcode}</span>}
            <input type="text" required onChange={handleChange} name="country" placeholder='Country' className='p-2 border border-slate-400 rounded-md' />
            {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
          </div>
          <input type="tel" required onChange={handleChange} name="phone" placeholder='Phone number' className='p-2 border border-slate-400 rounded-md' />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
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
