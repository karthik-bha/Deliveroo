import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router";

const Cart = () => {
  const { food_list, cartItems, removeFromCart , getTotal, url} =useContext(StoreContext);
  const navigate= useNavigate();
  return (
    <div className="min-h-[80vh]  mx-auto px-4">
  <div className="max-w-[1200px] mx-auto font-[Outfit]">
    {/* Cart Items Section */}
    <div className="mt-12">
      {/* Table Headers */}
      <div className="hidden md:grid md:grid-cols-6 text-slate-500 gap-4 mb-4">
        <p className="text-center">Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <div className="md:hidden text-sm text-slate-500 mb-2">Your Cart</div>
      <hr className="h-[1px] bg-black border-none mb-4" />

      {/* Cart Items */}
      {food_list.map((items, index) => {
        if (cartItems[items._id] > 0) {
          return (
            <div key={items._id}>
              <div className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center p-4 even:bg-gray-50 rounded-lg">
                {/* Item Image */}
                <div className="w-full md:w-auto">
                  <img 
                    src={url+"/images/"+items.image} 
                    alt={items.name}
                    className="w-20 h-20 object-cover mx-auto md:mx-0 rounded-lg"
                  />
                </div>

                {/* Item Details */}
                <p className="font-medium truncate">{items.name}</p>
                <p>${items.price}</p>
                <p>{cartItems[items._id]}</p>
                <p>${items.price * cartItems[items._id]}</p>
                
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(items._id)}
                  className="text-red-500 hover:text-red-700 text-xl md:text-base w-full md:w-auto text-center"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
              <hr className="h-[1px] bg-black border-none my-2" />
            </div>
          );
        }
      })}
    </div>

    {/* Cart Total and Promo Code */}
    <div className="flex flex-col lg:flex-row gap-8 my-12">
      {/* Cart Total */}
      <div className="flex-1 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Cart Total</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${getTotal()}</p>
          </div>
          <hr className="bg-black h-px" />
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>${2}</p>
          </div>
          <hr className="bg-black h-px" />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>${getTotal() + 2}</p>
          </div>
        </div>
        <button 
          onClick={() => navigate("/order")}
          className="w-full bg-[tomato] px-6 py-3 rounded-md text-white 
          hover:bg-[#ff6347e6] mt-6"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>

      {/* Promo Code */}
      <div className="flex-1 bg-gray-50 p-6 rounded-lg">
        <p className="text-lg mb-4">Promo Code</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[tomato]"
          />
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Cart
