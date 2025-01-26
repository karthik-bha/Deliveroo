import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = import.meta.env.VITE_API_URL;

    const addToCart = async (itemId) => {
        try {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1,
            }));
            if (token) {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setCartItems((prev) => {
                const updated = { ...prev, [itemId]: (prev[itemId] || 1) - 1 };
                if (updated[itemId] <= 0) delete updated[itemId];
                return updated;
            });
            if (token) {
                await axios.delete(`${url}/api/cart/remove`, {
                    data: { itemId },
                    headers: { token },
                });
            }
        } catch (err) {
            console.error("Error removing from cart:", err);
        }
    };

    const loadCartData = async (authToken) => {
        try {
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { token: authToken },
            });
            setCartItems(response.data.cart || {});
        } catch (err) {
            console.error("Error loading cart data:", err);
        }
    };

    const getTotal = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = food_list.find((product) => product._id === itemId);
            if (itemInfo) {
                total += itemInfo.price * cartItems[itemId];
            }
            return total;
        }, 0);
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data || []);
        } catch (err) {
            console.error("Error fetching food list:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotal,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
