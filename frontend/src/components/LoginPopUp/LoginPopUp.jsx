import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import validator from 'validator';

const LoginPopUp = ({ setLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [title, setTitle] = useState('SignUp');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (title === 'SignUp' && !form.name) {
      toast.error('Please enter your name.');
      return;
    }

    // Email format validation
    if (!validator.isEmail(form.email)) {
      toast.error('Invalid email format.');
      return;
    }

    // Password length validation
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const endpoint = title === 'Login' ? '/api/user/login' : '/api/user/register';
      const response = await axios.post(url + endpoint, form);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(response.data.message);
        setLogin(false);
      } else {
        toast.error(response.data.message); // Display backend error message
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Display specific backend error
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <form
        className="w-[350px] md:w-[400px] bg-white p-6 rounded-lg shadow-lg"
        onSubmit={onLogin}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <button
            type="button"
            onClick={() => setLogin(false)}
            aria-label="Close"
            className="hover:opacity-75 transition-opacity"
          >
            <img src={assets.cross_icon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {title === 'SignUp' && (
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-tomato"
              required
            />
          )}

          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-tomato"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-tomato"
            required
          />

          {title === 'SignUp' && (
            <div className="flex items-center gap-2">
              <input type="checkbox" required className="w-4 h-4" />
              <label className="text-sm text-gray-600">
                By signing up, you agree to the terms of use & privacy policy.
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-[tomato] text-white py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">🌀</span> Processing...
            </span>
          ) : (
            title === 'SignUp' ? 'Create Account' : 'Login'
          )}
        </button>

        {/* Toggle Between SignUp and Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {title === 'SignUp' ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTitle('Login')}
                className="text-tomato hover:underline"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setTitle('SignUp')}
                className="text-tomato hover:underline"
              >
                Signup here
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;