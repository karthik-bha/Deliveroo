import React from "react";
import { menu_list } from "../../assets/assets/frontend_assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="max-w-[1200px] flex gap-6 overflow-auto overscroll-x-none mx-auto items-center h-auto my-4 explore-menu-list ">
      {menu_list.map((items) => {
        return (
          <div
            className="text-center sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] mx-4 flex flex-col"
            key={items.menu_name} // Use unique identifier from the item, e.g., menu_name
          >
            <div
              className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] li-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === items.menu_name ? "All" : items.menu_name
                )
              }
            >
              <img
                src={items.menu_image}
                className={`object-contain items-center mx-auto hover:cursor-pointer ${
                  category === items.menu_name ? "active" : ""
                }`}
                alt={items.menu_name}
              />
            </div>
            <p className="font-semibold text-[16px]">{items.menu_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ExploreMenu;
