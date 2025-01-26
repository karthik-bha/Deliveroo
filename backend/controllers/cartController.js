import userModel from '../models/userModel.js'

export const addToCart = async (req, res) => {
    try {
        let user = await userModel.findById(req.body.userId);
        let cartData = await user.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.status(200).json({ success: true, message: "Added to cart!" });
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ success: false, message: "Unable to update cart!" });
    }
}
export const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        // if(!cartData){
        //     return res.status(403).json({message:"Please add items to cart", success:false});
        // }
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.status(200).json({ message: "removed from cart", success: true });

    } catch (err) {
        // console.log(err);
        return res.status(500).json({ success: false, message: "Unable to update cart!" });
    }
}
export const getCart = async (req, res) => {
    try {
        const user=await userModel.findById(req.body.userId);
        const cartData=await user.cartData;
        res.status(200).json({ message: "Fetch success", success: true, cart:cartData });
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ success: false, message: "Unable to fetch!" });
    }
}

