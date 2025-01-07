import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood=async(req, res)=>{
  
        let image_filename=`${req.file.filename}`;
        const {name, description, price, category}= req.body;
        const food=new foodModel({
            name:name,
            description:description,
            price:price,
            category:category,
            image:image_filename
        })
    try{
        await food.save();
        res.json({success:true, message:"saved"});
    }
    catch(err){
        console.err(err);
        res.json({success:false});
    }
}

export{addFood};
