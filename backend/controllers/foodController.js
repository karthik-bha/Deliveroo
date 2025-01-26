import foodModel from "../models/foodModel.js";
// import fs from "fs/promises"; // Use promises for asynchronous file operations in local
import cloudinary from "../cloudinary.js";
// Add Food Item
const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;
    

    // Input Validation
    if (!name || !description || !price || !category || !req.file) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // const image_filename = req.file.filename; local storage

    try {
        //local
        // const food = new foodModel({
        //     name,
        //     description,
        //     price,
        //     category,
        //     image: image_filename,
        // });
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "food-images",  // Cloudinary folder name
            public_id: `${Date.now()}-${req.file.originalname}`,  // Generate unique public ID
        });
        // Save the food item along with the Cloudinary URL
        // console.log(result.secure_url);
        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: result.secure_url, // Cloudinary image URL
        });
        await food.save();
        res.status(201).json({ success: true, message: "Food item saved successfully" });
    } catch (err) {
        console.error("Error adding food item:", err);
        res.status(500).json({ success: false, message: "Failed to save food item", error:err });
    }
};

// List All Food Items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        if (foods.length === 0) {
            return res.status(200).json({ success: true, message: "No food items found", data: [] });
        }

        res.status(200).json({ success: true, data: foods, message: "Food items retrieved successfully" });
    } catch (err) {
        console.error("Error fetching food items:", err);
        res.status(500).json({ success: false, message: "Failed to fetch food items" });
    }
};

const removeFood = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    try {
        // Find and delete the food item from the database
        const food = await foodModel.findByIdAndDelete(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        
        // Extract the public ID from the image URL
        const publicId = food.image.split('/').pop().split('.')[0]; 

        // Delete the associated image file from Cloudinary
        try {
            const result = await cloudinary.v2.uploader.destroy(`food-images/${publicId}`);
            // console.log("Image deleted from Cloudinary:", result);
            // await fs.unlink(`uploads/${food.image}`); //local
            // Return the response after successful deletion
            res.status(200).json({ success: true, message: "Food item deleted successfully", data: food });
        } catch (err) {
            console.error("Error deleting image from Cloudinary:", err);
            return res.status(500).json({ success: false, message: "Failed to delete image from Cloudinary" });
        }

    } catch (err) {
        console.error("Error deleting food item:", err);
        res.status(500).json({ success: false, message: "Failed to delete food item" });
    }
};

export { addFood, listFood, removeFood };