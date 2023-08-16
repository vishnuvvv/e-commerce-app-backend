import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const loginUser =  async (req, res) => {

    const { username, password } = req.body
    try {
        const existingUser = await User.findOne({ username })
        !existingUser && res.status(400).json("Username is incorrect..!")

        const passwordIsTrue = bcrypt.compareSync(password, existingUser.password)
        !passwordIsTrue && res.status(401).json("Password is incorrect..!")


        const accessToken = jwt.sign({id: existingUser._id,
            isAdmin: existingUser.isAdmin
        }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.status(200).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            createdAt: existingUser.createdAt,
            UpdatedAt: existingUser.updatedAt,
            accessToken
        })
    } catch (err) {
        res.status(500).json(err)
    }
}
