import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Not authrized. No token provided",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "User not found." });

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Toke  is invaild or expired" });
  }
};



export const authorize = (...roles ) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success : false,
                message : `Access denied. Role ${req.user.role} is not authorized`  
            })
        }
        next();
    }
};


