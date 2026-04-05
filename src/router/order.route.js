import express from "express";



const router = express.Router();

//private
router.post("/orders", ()=>console.log("Place order from cart") );

router.get("/orders", ()=> console.log("Get my orders"));




router.get("/orders/:id", ()=>console.log("Get order details") );


//admin
router.get("/orders/admin/all", ()=>console.log("Get all orders "));

router.put("/orders/:id/status", ()=>console.log("Update order status "));




export default router;
