import React from 'react';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import {Route, Routes} from "react-router-dom";
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';


const App = () => {
  const url = import.meta.env.VITE_API_URL;
  return (
    <div className='font-[Outfit]'>
      <ToastContainer />
      <Navbar/>
      <hr className='border border-slate-400 outline-none'/>
      <div className='flex '>
        <Sidebar/>
        
        <Routes>
            <Route path='/add' element={<Add url={url}/>}/>
            <Route path='/list' element={<List url={url}/>}/>
            <Route path='/order' element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App