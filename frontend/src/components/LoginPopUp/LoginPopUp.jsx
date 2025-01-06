import React, { useState } from 'react'
import { assets } from '../../assets/assets/frontend_assets/assets'

const LoginPopUp = ({ setLogin }) => {
  const [Title, setTitle] = useState("SignUp")
  

  return (
    <div className="fixed grid w-[100%] min-h-screen z-50 bg-black bg-opacity-60">
      <form className="w-[350px] md:w-[400px] justify-center items-center m-auto bg-white p-4 rounded-md">
        <div className="flex justify-between items-center mx-2 my-4">
          <h1 className="text-3xl font-semibold">{Title}</h1>
          <img
            src={assets.cross_icon}
            onClick={() => setLogin(false)}
            className="hover:cursor-pointer h-[20px] w-[20px]"
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {Title === "SignUp" && (
            <input
              type="text"
              placeholder="Enter Name"
              className="p-1 m-1 border border-slate-200 rounded-sm"
            />
          )}

          <input
            type="email"
            placeholder="Enter Email"
            className="p-1 m-1 border border-slate-200 rounded-sm"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-1 m-1 border border-slate-200 rounded-sm"
          />
          {Title === "SignUp" && (
            <div className="flex gap-1 ml-1 ">
              <input type="checkbox" required className="mb-4" />
              <label className="text-[14px] text-slate-500">
                By signing up, you agree to the terms of use & privacy policy.{" "}
              </label>
            </div>
          )}
        </div>

        {Title === "SignUp" ? (
          <>
            <div className="w-full  mt-4 items-center justify-center text-center">
              <button className="text-center bg-[tomato] w-full rounded-md p-2 text-white hover:text-black">
                <p className="font-semibold"> Create Account </p>
              </button>
            </div>

            <p className="mt-4 ml-1">
              Already have an account?
              <span
                onClick={() => setTitle("Login")}
                className="text-[tomato] cursor-pointer ml-1"
              >
                Login here
              </span>
            </p>
          </>
        ) : (
              <>
            <div className="w-full  mt-4 items-center justify-center text-center">
              <button className="text-center bg-[tomato] w-full rounded-md p-2 text-white hover:text-black">
                <p className="font-semibold"> {Title}</p>
              </button>
            </div>

          <p className="mt-4 ml-1">
            Don't have an account?
            <span
              onClick={() => setTitle("SignUp")}
              className="text-[tomato] cursor-pointer ml-1"
            >
              Signup here
            </span>
              </p>
              </>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp
