import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets/frontend_assets/assets';
import {toast} from "react-toastify";

const MyOrders = () => {
    const [data, setData] = useState([])
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "api/order/userorders", {}, { headers: { token } });
            const paidOrders = response.data.data.filter(order => order.payment === true);
            setData(paidOrders);
            // console.log(response.data.data);
        } catch (err) {
            // console.log(err);
            toast.error("Error fetching orders");

        }
    }
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])
    return (
        <div className='text-center min-h-[80vh]'>
            <h2 className='my-12 font-bold text-[2rem]'>My Orders</h2>
            <div className='my-12'>
                {data.map((order, index)=>{
                    return(
                        <div key={index} className=' text-[16px] text-center p-2 rounded-md flex flex-col md:grid md:grid-cols-6 max-w-[80vw] mx-auto border border-slate-400 shadow-md my-4 items-center' >
                            <img src={assets.parcel_icon} alt=""/>
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return <b>{item.name} x {item.quantity}</b>
                                }else{
                                    return <b>{item.name} x {item.quantity}, </b>
                                }
                            })} </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span className='text-[tomato]'>&#8226;</span> {order.status}</p>
                            <div className='flex mx-auto '>
                            <button className='bg-red-200 px-4 py-1 rounded-md' onClick={()=>fetchOrders()}>Track Order</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders