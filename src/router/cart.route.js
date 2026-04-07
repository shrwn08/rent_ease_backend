import express from "express";
import {getCart, addToCart, updateCartItem, removeFromCart, clearCart} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";



const router = express.Router();

//private

router.get("/cart", protect, getCart);



router.post("/cart", protect, addToCart);

router.put("/cart/:id", protect, updateCartItem);

router.delete("/cart/:id", protect, removeFromCart);

router.delete("/cart/clear", protect, clearCart);




export default router;
