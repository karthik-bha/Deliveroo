import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import Loader from '../../loader/Loader';
const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [loading, setLoading]=useState(false);

    const verifyPayment = async () => {
        try {
            // console.log(success, orderId);
            setLoading(true);
            const response = await axios.post(url + "api/order/verify", { success, orderId });
            // console.log(response);
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); // Redirect to home or an error page
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [success, orderId]); // Add dependencies to prevent infinite loops

    return <>{loading && <div className='h-[80vh] flex items-center justify-center m-auto'><Loader/></div>}</>; // No need to render anything
};

export default Verify;