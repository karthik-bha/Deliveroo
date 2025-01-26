import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of foods
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}api/food/list`);
      setList(response.data.data);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch food list");
    } finally {
      setLoading(false);
    }
  };

  // Delete a food item
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${url}api/food/delete/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete food item");
      console.error(err);
    }
  };

  // Fetch the list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col text-slate-500 w-full max-w-[1000px] mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">All Foods List</h2>
      <div className="border border-slate-500 rounded-lg overflow-hidden">
        {/* Table Header (Visible on larger screens) */}
        <div className="hidden md:grid md:grid-cols-5 bg-slate-100 border-b border-slate-500 p-2 font-bold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-500">
          {loading ? (
            <p className="p-4 text-center text-slate-400">Loading...</p>
          ) : list.length > 0 ? (
            list.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 p-4 md:p-2"
              >
                {/* Image */}
                <div className="flex items-center justify-center md:justify-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[60px] h-[45px] md:w-[40px] md:h-[30px] object-cover rounded-lg"
                  />
                </div>

                {/* Name */}
                <p className="text-center md:text-left">{item.name}</p>

                {/* Category */}
                <p className="text-center md:text-left">{item.category}</p>

                {/* Price */}
                <p className="text-center md:text-left">${item.price}</p>

                {/* Action */}
                <div className="flex justify-center md:justify-start">
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-slate-400">No food items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;