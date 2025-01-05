import React, { useState } from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [goTo, setgoTo] = useState("home");
  return (
    <>
      <div className="font-[Outfit] flex items-center justify-around p-4 md:p-6 max-w-[1200px] mx-auto shadow-md rounded-md">
        <div className="p-auto">
          <h1 className="font-bold text-2xl md:text-4xl hover:cursor-pointer">
            Deliveroo.
          </h1>
        </div>

        <ul className="gap-4 hidden md:flex text-[18px]">
          {[
            { label: "Home", value: "home" },
            { label: "Menu", value: "menu" },
            { label: "Mobile App", value: "mobile" },
            { label: "Contact us", value: "contact" },
          ].map((item) => (
            <li
              key={item.value}
              className={`hover:cursor-pointer hover:font-semibold active:border-black active:border ${
                goTo === item.value ? "underline font-bold" : ""
              }`}
              onClick={() => setgoTo(item.value)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 ">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-[25px] h-auto hover:cursor-pointer"
          />
          <img
            src={assets.basket_icon}
            alt="basket"
            className="w-[25px] h-auto hover:cursor-pointer"
          />
          <button className="hover:font-semibold text-[16px] md:text-[18px]">
            Sign In
          </button>
        </div>

        {open ? (
          <div
            className=" md:hidden hover:cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <img src={assets.cross2} width={40} />
          </div>
        ) : (
          <div
            className=" md:hidden hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <img src={assets.hamburger} width={40} />{" "}
          </div>
        )}

        {open && (
          <div className="md:hidden absolute top-0 left-0 bottom-0 z-20 bg-white shadow-md ">
            <div className="my-8 flex flex-col gap-4 px-4 ">
              <h1 className="font-bold text-2xl md:text-4xl hover:cursor-pointer">
                Deliveroo.
              </h1>

              <ul className="gap-4 flex flex-col text-[18px]">
                <li className="hover:cursor-pointer hover:font-semibold">
                  Home
                </li>
                <li className="hover:cursor-pointer hover:font-semibold">
                  Menu
                </li>
                <li className="hover:cursor-pointer hover:font-semibold">
                  Mobile App
                </li>
                <li className="hover:cursor-pointer hover:font-semibold">
                  Contact us
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
