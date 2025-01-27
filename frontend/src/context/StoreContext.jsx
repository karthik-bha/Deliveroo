import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [loader, setLoader] = useState(false);
    const url = import.meta.env.VITE_API_URL;

    // Fetch Food List
 
    const fetchFoodList = async () => {
        setLoader(true);
        try {
            
            const response = await axios.get(`${url}api/food/list`);
            setFoodList(response.data.data || []);
        } catch (err) {
            console.error("Error fetching food list:", err);
        } finally {
            setLoader(false);
        }
    };

    // Load Cart Data
    const loadCartData = async (authToken) => {
        setLoader(true);
        try {
            const response = await axios.get(`${url}api/cart/get`, {
                headers: { token: authToken },
            });
            setCartItems(response.data.cart || {});
        } catch (err) {
            console.error("Error loading cart data:", err);
        } finally {
            setLoader(false);
        }
    };

    // Add to Cart
    const addToCart = async (itemId) => {
        setLoader(true);
        try {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1,
            }));
            if (token) {
                await axios.post(`${url}api/cart/add`, { itemId }, { headers: { token } });
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        } finally {
            setLoader(false);
        }
    };

    // Remove from Cart
    const removeFromCart = async (itemId) => {
        setLoader(true);
        try {
            setCartItems((prev) => {
                const updated = { ...prev, [itemId]: (prev[itemId] || 1) - 1 };
                if (updated[itemId] <= 0) delete updated[itemId];
                return updated;
            });
            if (token) {
                await axios.delete(`${url}api/cart/remove`, {
                    data: { itemId },
                    headers: { token },
                });
            }
        } catch (err) {
            console.error("Error removing from cart:", err);
        } finally {
            setLoader(false);
        }
    };

    // Calculate Total Price
    const getTotal = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = food_list.find((product) => product._id === itemId);
            if (itemInfo) {
                total += itemInfo.price * cartItems[itemId];
            }
            return total;
        }, 0);
    };

    // Load Data on Initial Render
    useEffect(() => {
        const loadData = async () => {
            setLoader(true);
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (err) {
                console.error("Error loading data:", err);
            } finally {
                setLoader(false);
            }
        };
        loadData();
    }, [url]); // Added dependency

    // Context Value
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
        loader,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
