import express from "express";
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", async(req,res)=>{

    const {username,email,password} = req.body

    const newUser =  await new User({
        username,
        email,
        password
    })
    try {
     const savedUser = await newUser.save();
     res.status(500).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
} )

export default authRouter;
