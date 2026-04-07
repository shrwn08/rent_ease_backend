import express from "express";
import {getCart, addToCart, updateCartItem} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";



const router = express.Router();

//private

router.get("/cart", protect, getCart);



router.post("/cart", protect, addToCart);

router.put("/cart/:id", protect, updateCartItem);

router.delete("/cart/:id", ()=>console.log("user can delete the product from the cart "));

router.delete("/cart/clear", ()=>console.log("admin can delete the cart "));




export default router;
