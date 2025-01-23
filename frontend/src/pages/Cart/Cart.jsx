import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router";

const Cart = () => {
  const { food_list, cartItems, removeFromCart , getTotal, url} =useContext(StoreContext);
  const navigate= useNavigate();
  return (
    <div className="mb-12">
      <div className="max-w-[1200px] mx-auto font-[Outfit]  ">
        <div className="mt-12 mx-2">
          <div className="grid grid-cols-6 text-slate-500 ">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr className="h-[1px] my-1 bg-black border-none " />
          {food_list.map((items, index) => {
            if (cartItems[items._id] > 0) {
              return (
                <>
                  <div className="grid grid-cols-6 items-center gap-2">
                    <img src={url+"/images/"+items.image} width={75} />
                    <p>{items.name}</p>
                    <p>${items.price}</p>
                    <p>{cartItems[items._id]}</p>
                    <p>${items.price * cartItems[items._id]}</p>
                    <p
                      onClick={() => removeFromCart(items._id)}
                      className="hover:cursor-pointer"
                    >
                      x
                    </p>
                  </div>
                  <hr className="h-[1px] my-1 bg-black border-none " />
                </>
              );
            }
          })}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center mx-2 ">
          <div className="flex flex-col md:w-[350px] lg:w-[500px] mt-12">
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
            <div className="mt-6">
            
              <button className="bg-[tomato] px-6 py-2 rounded-md text-white hover:text-black"
              onClick={()=>navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
           
            </div> 
          </div>
          <div className="mt-6 md:w-[350px] lg:w-[500px] text-[18px] text-slate-500">
            <p>If you have a promo code, Enter it here</p>
            <div className="flex">
              <input
                type="text"
                placeholder="promo code"
                className="w-3/4 bg-gray-200 p-2"
              />
              <button className="bg-black text-white w-1/4 font-semibold">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart
