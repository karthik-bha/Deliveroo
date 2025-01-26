import React, { useContext } from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-32 md:h-48 object-cover"
        />

        {/* Add/Remove Cart Buttons */}
        {!cartItems[id] ? (
          <button
            className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => addToCart(id)}
            aria-label={`Add ${name} to cart`}
          >
            <img src={assets.add_icon_white} width={24} alt="Add to cart" />
          </button>
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white rounded-full p-2 shadow-md">
            <button
              onClick={() => removeFromCart(id)}
              aria-label={`Remove one ${name} from cart`}
            >
              <img src={assets.remove_icon_red} width={20} alt="Remove from cart" />
            </button>
            <p className="text-sm font-semibold">{cartItems[id]}</p>
            <button
              onClick={() => addToCart(id)}
              aria-label={`Add one more ${name} to cart`}
            >
              <img src={assets.add_icon_green} width={20} alt="Add to cart" />
            </button>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg md:text-xl font-semibold">{name}</h2>
          <img src={assets.rating_starts} alt="Rating" className="h-4 md:h-5" />
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <p className="text-xl text-tomato font-semibold text-center md:text-left">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;