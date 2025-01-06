import React, { useContext} from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  return (
    <div className="rounded-lg shadow-md">
      <div className="relative">
        <img src={image} />
        {!cartItems[id] ? ( 
          <div className=" absolute bottom-[15px] right-[15px]">
            <img
              src={assets.add_icon_white}
              width={40}
              onClick={() => addToCart(id)}
              alt="add"
            />
          </div>
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex gap-2 items-center bg-white rounded-full">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt="remove"
            />
            <p>{cartItems[id]}</p>

            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt="add"
            />
          </div>
        )}
      </div>
      <div>
        <div className="flex flex-col md:flex-row md:justify-between m-2 items-center">
          <h2 className="font-[500] text-[16px] md:text-[22px]">{name}</h2>
          <img src={assets.rating_starts} className="h-[16px]" />
        </div>
        <div className="m-2">
          <p className="text-slate-500">{description}</p>
        </div>
        <div className="m-2 mb-4">
          <p className="text-[20px] text-[tomato] font-semibold text-center md:text-left">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
