import React from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="mt-4 bg-[#323232]">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-around gap-4 text-white text-center md:text-left items-center md:items-start">
        <div className="p-4 max-w-[500px] ">
          <div>
            <h1 className="font-bold text-2xl md:text-4xl  hover:cursor-pointer">
              Deliveroo.
            </h1>
            <p className="pt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="flex gap-4 mt-4 items-center mx-auto justify-center md:mx-0 md:items-start md:justify-start">
            <img src={assets.facebook_icon} alt="facebook" className="src" />
            <img src={assets.twitter_icon} alt="twitter" className="src" />
            <img src={assets.linkedin_icon} alt="linkedin" className="src" />
          </div>
        </div>

        <div className="max-w-[300px] pt-6 ">
          <h2 className="font-bold text-[16px] md:text-2xl  text-center">
            COMPANY
          </h2>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="hover:cursor-pointer text-slate-200 hover:text-white">
              Home
            </li>
            <li className="hover:cursor-pointer text-slate-200 hover:text-white">
              About us
            </li>
            <li className="hover:cursor-pointer text-slate-200 hover:text-white">
              Delivery
            </li>
            <li className="hover:cursor-pointer text-slate-200 hover:text-white">
              Privacy Policy
            </li>
          </ul>
        </div>

        <div className="max-w-[500px] pt-6  ">
          <h2 className="font-bold text-[16px] md:text-2xl  ">GET IN TOUCH</h2>
          <ul className="flex flex-col mt-2 gap-2">
            <li>+61-3-9825-2300</li>
            <li>contactSupp@Deliveroo.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
