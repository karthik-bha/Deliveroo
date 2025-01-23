import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            console.log(success, orderId);
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            console.log(response);
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); // Redirect to home or an error page
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [success, orderId]); // Add dependencies to prevent infinite loops

    return null; // No need to render anything
};

export default Verify;