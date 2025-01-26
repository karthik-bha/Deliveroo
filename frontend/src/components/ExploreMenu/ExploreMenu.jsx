import React from "react";
import { menu_list } from "../../assets/assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id="Menu" className="p-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-semibold mb-4">
          Explore our menu
        </h1>
        <p className="text-sm md:text-lg text-gray-600 mb-8">
          Choose from a diverse menu of delectable array of dishes. Our mission
          is to satisfy your cravings.
        </p>
      </div>

      {/* Menu List Section */}
      <div className="max-w-6xl py-4 mx-auto overflow-x-auto no-scrollbar">
        <div className="flex gap-4 md:gap-8 justify-start items-center">
          {menu_list.map((item) => (
            <div
              key={item.menu_name}
              className="flex flex-col items-center text-center w-24 md:w-40"
            >
              {/* Menu Item Image */}
              <button
                className={`w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden transition-transform transform hover:scale-105 focus:outline-none ${
                  category === item.menu_name ? "border-2 border-orange-500" : ""
                }`}
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                aria-label={`Filter by ${item.menu_name}`}
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Menu Item Name */}
              <p className="mt-2 text-sm md:text-lg font-semibold">
                {item.menu_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;