import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRoute.js";

//app config
const app=express();
const PORT=4000;

// middleware
app.use(express.json());
app.use(cors());


connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));

app.get("/",(req, res)=>{
    res.send("Hello");
})

app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})