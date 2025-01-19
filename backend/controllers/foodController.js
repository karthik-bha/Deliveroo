import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;
    const { name, description, price, category } = req.body;
    const food = new foodModel({
        name: name,
        description: description,
        price: price,
        category: category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "saved" });
    }
    catch (err) {
        console.err(err);
        res.json({ success: false });
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if(foods.length===0){
            return  res.status(200).json({message:"No items present"});
        }
        res.status(200).json({ success: true, data: foods, message:"Items Retrieved" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error during fetch" });
    }
}

const removeFood=async(req, res)=>{
    const {id}=req.params;
    try{
        let deletedFood=await foodModel.findByIdAndDelete(id);
        // fs.unlink(`uploads/${food.image}`, ()=>{})
        res.status(200).json({success:true, data:deletedFood, message:"Successfully deleted"});
    }catch(err){
        res.status(500).json({ success: false, message: "Deletion unsccessful" });
    }
}


export { addFood, listFood, removeFood };
