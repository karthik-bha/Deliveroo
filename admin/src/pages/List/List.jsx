import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      let response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(response.data.error);
    }
  }
  useEffect(() => {
    fetchList();
  }, [])

  const deleteItem = async (id ) => {
    
    try {
      let response = await axios.delete(`${url}/api/food/delete/${id}`);
      setList(list.filter((prevItem) => prevItem._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(response.data.message);
      console.error(error);
    }
  }
  return (
    <>
      <div className="m-12 flex flex-col text-slate-500 w-[1000px]">
        <h2 className="text-[18px] font-semibold mb-2">All Foods List</h2>
        <div className="border border-slate-500 ">
          <div className="grid grid-cols-5 border-b border-slate-500 pl-2 ">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          <div>
            {list.map((item) => {
              return (
                <>
                  <div key={item._id} className="grid grid-cols-5 py-2 gap-4 md:gap-6">
                    <img src={`${url}/images/` + item.image} alt="img" className="w-[40px] h-[30px] pl-2" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p onClick={() => deleteItem(item._id)} className='cursor-pointer'>x</p>

                  </div>
                  <hr className="bg-slate-500 h-[1px] border-none w-full" />
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default List