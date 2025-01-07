import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setLogin }) => {
  const [open, setOpen] = useState(false);
  const [goTo, setgoTo] = useState("home");
  const {getTotal}= useContext(StoreContext);
  return (
    <>
      <div className="font-[Outfit] flex items-center justify-around p-4 md:p-6 max-w-[1200px] mx-auto shadow-md rounded-md">
        <div className="p-auto">
          <Link to="/">
            <h1 className="font-bold text-2xl md:text-4xl hover:cursor-pointer">
              Deliveroo.
            </h1>
          </Link>
        </div>

        <ul className="gap-4 hidden md:flex text-[18px]">
          <Link
            to="/"
            onClick={() => setgoTo("home")}
            className={goTo === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#Menu"
            onClick={() => setgoTo("Menu")}
            className={goTo === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#AppDownload"
            onClick={() => setgoTo("AppDownload")}
            className={goTo === "AppDownload" ? "active" : ""}
          >
            Mobile App
          </a>
          <a
            href="#Footer"
            onClick={() => setgoTo("Contact")}
            className={goTo === "Contact" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>

        <div className="flex gap-4 ">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-[25px] h-auto hover:cursor-pointer"
          />
          <div className="relative">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              alt="basket"
              className="w-[25px] h-auto hover:cursor-pointer "
            />
            <div className={getTotal()>0?"dot":""}></div>
            
          </Link>
          </div>
          <button
            className="hover:font-semibold text-[16px] md:text-[18px]"
            onClick={() => setLogin(true)}
          >
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
          <div className="md:hidden fixed top-0 left-0 bottom-0 z-20 bg-white shadow-md ">
            <div className="my-8 flex flex-col gap-4 px-4 ">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl md:text-4xl hover:cursor-pointer">
                  Deliveroo.
                </h1>
                <div
                  className=" md:hidden hover:cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <img src={assets.cross2} width={40} />
                </div>
              </div>

              <ul className="gap-4 flex flex-col text-[18px]">
                <Link
                  to="/"
                  onClick={() => setgoTo("home")}
                  className={goTo === "home" ? "active" : ""}
                >
                  Home
                </Link>
                <a
                  href="#Menu"
                  onClick={() => setgoTo("Menu")}
                  className={goTo === "Menu" ? "active" : ""}
                >
                  Menu
                </a>
                <a
                  href="#AppDownload"
                  onClick={() => setgoTo("AppDownload")}
                  className={goTo === "AppDownload" ? "active" : ""}
                >
                  Mobile App
                </a>
                <a
                  href="#Footer"
                  onClick={() => setgoTo("Contact")}
                  className={goTo === "Contact" ? "active" : ""}
                >
                  Contact Us
                </a>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
