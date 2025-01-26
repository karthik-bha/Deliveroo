import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const front_url = process.env.FRONTEND_URL;


//Admin functions
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    // Input Validation
    if (!id) {
        return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    try {
        // Delete the order
        const deletedData=await orderModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Order deleted successfully",order:deleteOrder});
    } catch (err) {
        console.error("Error deleting order:", err);
        res.status(500).json({ success: false, message: "Error deleting order" });
    }
};


// Update Order Status (Admin)
export const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;

    // Input Validation
    if (!orderId || !status) {
        return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }

    try {
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order status updated" });
    } catch (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
};

// User functions
// Place Order
export async function placeOrder(req, res) {
    const { userId, items, amount, address } = req.body;

    // Input Validation
    if (!userId || !items || !amount || !address) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Ensure the total amount is at least $0.50 USD
    if (amount < 0.5) {
        return res.status(400).json({ success: false, message: "Minimum order amount is $0.50 USD." });
    }

    try {
        // Create a temporary order (not saved yet)
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address, // Mark as pending until payment is successful
        });

        // Prepare Stripe Line Items
        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd", // Use USD
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // Convert USD to cents
            },
            quantity: item.quantity,
        }));

        // Add Delivery Charges
        line_items.push({
            price_data: {
                currency: "usd", // Use USD
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: Math.round(2 * 100), // Convert USD to cents
            },
            quantity: 1,
        });

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${front_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${front_url}/verify?success=false&orderId=${newOrder._id}`,
            currency: "usd", 
        });

        if (!session.url) {
            return res.status(500).json({ success: false, message: "Error during payment processing" });
        }

        // Save the temporary order (with pending status)
        await newOrder.save();

        // Return the Stripe session URL
        return res.json({ success: true, session_url: session.url });
    } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ success: false, message: "Error during payment processing" });
    }
}

// Verify Order
export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    // Input Validation
    if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    try {
        if (success === "true" || success === true) {
            // Mark Order as Paid and Save Permanently
            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                { status: "paid", payment: true },
                { new: true }
            );

            // Clear User's Cart
            await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} });

            return res.json({ success: true, message: "Payment successful", order: updatedOrder });
        } else {
            // Delete Order if Payment Failed
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: "Payment failed" });
        }
    } catch (err) {
        console.error("Error verifying order:", err);
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
};

// Get User Orders
export const userOrders = async (req, res) => {
    const { userId } = req.body;

    // Input Validation
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const orders = await orderModel.find({ userId });
        res.json({ data: orders, success: true });
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// Get All Orders (Admin)
export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ data: orders, success: true });
    } catch (err) {
        console.error("Error fetching all orders:", err);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

