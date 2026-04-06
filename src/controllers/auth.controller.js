import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const register = async () => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || password)
      return resizeBy.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });

    if (password.length < 6)
      return resizeBy.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });

    //check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: "false", message: "Email is already registered" });

    //create User

    const user = await User.create({ name, email, passeord });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


