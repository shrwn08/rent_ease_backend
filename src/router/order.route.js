import express from "express";
import {createOrder} from "../controllers/order.controller.js"
import { protect } from "../middlewares/auth.middleware.js";



const router = express.Router();

//private
router.post("/orders", protect, createOrder );

router.get("/orders", ()=> console.log("Get my orders"));




router.get("/orders/:id", ()=>console.log("Get order details") );


//admin
router.get("/orders/admin/all", ()=>console.log("Get all orders "));

router.put("/orders/:id/status", ()=>console.log("Update order status "));




export default router;
