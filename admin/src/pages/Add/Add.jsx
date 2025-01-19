import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {
  
   const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })


  const handleChange = (e) => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }))
    console.log(data);
  }

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    })
    formData.append("image", image);
    try {
      let response = await axios.post(`${url}/api/food/add`, formData);
      console.log(response);
      if (response.data.success) {
    
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        })

        setImage(false);
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(response.data.message);
    }
  }
  return (
    <div className='text-black h-[80vh] font-[16px]'>
      <form onSubmit={handleSubmit} className='flex p-2 py-8 md:p-8 flex-col max-w-[400px] md:min-w-[400px] lg:min-w-[600px] gap-[20px]  text-slate-500 '>
        <div className='flex flex-col gap-2'>
          <label>Upload Image</label>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='border border-slate-400' width={100} />
          </label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} placeholder="Upload" id="image" hidden required />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='prod_name'>Product name</label>
          <input onChange={handleChange} name="name" value={data.name} type="text" id="prod_name" placeholder='Type here' className='border border-slate-400' />

        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='description'>Product description</label>
          <textarea onChange={handleChange} name="description" value={data.description} rows="6" id="description" placeholder='Write description here' className='border border-slate-400' />
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 '>

            <label htmlFor='category'>Product category</label>
            <select onChange={handleChange} name="category" value={data.category} id="category" className='max-w-[120px] text-[16px] p-2 bg-white border border-black text-black text-center '>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>

          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='price'>Product price</label>
            <input onChange={handleChange} name="price" value={data.price} type="Number" placeholder='$20' id='price' className='max-w-[120px] text-[16px] p-1 bg-white border border-black text-black '></input>
          </div>

        </div>
        <div>
          <button type="submit" className='bg-black text-white px-12 py-2 hover:cursor-pointer'>ADD</button>
        </div>
      </form>
    </div>
  )
}

export default Add