import foodModel from "../models/foodModel.js";
import fs from "fs/promises"; // Use promises for asynchronous file operations

// Add Food Item
const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;

    // Input Validation
    if (!name || !description || !price || !category || !req.file) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const image_filename = req.file.filename;

    try {
        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: image_filename,
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food item saved successfully" });
    } catch (err) {
        console.error("Error adding food item:", err);
        res.status(500).json({ success: false, message: "Failed to save food item" });
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

// Remove Food Item
const removeFood = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    try {
        const food = await foodModel.findByIdAndDelete(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete the associated image file
        try {
            await fs.unlink(`uploads/${food.image}`);
        } catch (err) {
            console.error("Error deleting image file:", err);
        }

        res.status(200).json({ success: true, message: "Food item deleted successfully", data: food });
    } catch (err) {
        console.error("Error deleting food item:", err);
        res.status(500).json({ success: false, message: "Failed to delete food item" });
    }
};

export { addFood, listFood, removeFood };