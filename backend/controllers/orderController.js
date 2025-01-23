import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function placeOrder(req, res) {
    const front_url = "http://localhost:5173";
    const { userId, items, amount, address } = req.body;

    try {
        const newOrder = new orderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} }); // Clean cart data

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Convert to paise
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // Convert to paise
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${front_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${front_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error during payment", success: false });
    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        if (success === "true" || success === true) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not paid" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
};