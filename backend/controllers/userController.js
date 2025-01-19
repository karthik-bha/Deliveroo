import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import validator from "validator"

const loginUser=async(req, res)=>{
        const {email, password}=req.body;
        try{
            const user=await User.findOne({email:email});
            if(!user){
                return res.status(400).json({success:false, message:"Invalid Credentials"});
            }
            const isMatch=await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({success:false, message:"Invalid Credentials"});
            }
            const token=createToken(user._id);
            res.status(200).json({success:true, message:"Login Success", token});
        }catch(err){
            res.status(500).json({success:false, message:"Server Error"});
        }
}

const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"});
}


const registerUser=async(req, res)=>{
    const {name, email, password}=req.body;
    try{
        const exists=await User.findOne({email:email});
        if(exists){
            return res.status(400).json({success:false, message:"User already exists"});
        }
        //validate email format and password length
        if(!validator.isEmail(email)){
           return res.status(400).json({success:false, message:"Invalid Email"});
        }
        if (password.length < 8) {
           return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" });
        }

        //  encrypting password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = newUser.save();
        const token=createToken(user._id);
        res.status(200).json({success:true,message:"User registered", token});        
    }catch(err){
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export {loginUser, registerUser}