import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import cloudinary from "../cloudinary.js"; // Import the cloudinary.js file
import { CloudinaryStorage } from "multer-storage-cloudinary"; 

const foodRouter=express.Router();

//local image storage
// const storage=multer.diskStorage({
//     destination:"uploads",
//     filename:(req, file, cb)=>{
//         return cb(null, `${Date.now()}${file.originalname}`);
//     }
// })
//cloud storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2, // Use Cloudinary instance
    params: {
      folder: "food-images", // Specify the folder in Cloudinary
      allowed_formats: ["jpg", "png", "jpeg"], // Allowed image formats
      public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`, // Create custom filenames based on timestamp
    },
  });
  

const upload=multer({storage:storage})

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/delete/:id", removeFood);

export default foodRouter;