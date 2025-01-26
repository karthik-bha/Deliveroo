import jwt from "jsonwebtoken";
// conerts token to userid 
export const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false, message:"Not authorized, login again"});
    }
    try{
        const token_decode=jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }catch(err){
        // console.log(err);
        return res.json({success:false, message:"Error"});
    }
}