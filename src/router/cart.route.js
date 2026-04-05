import express from "express";



const router = express.Router();

//private

router.get("/cart", ()=> console.log("all products list from the cart"));



router.post("/cart", ()=>console.log("add/update product in the cart") );

router.put("/cart/:id", ()=>console.log("add the quantity of the product") );

router.delete("/cart/:id", ()=>console.log("user can delete the product from the cart "));

router.delete("/cart/clear", ()=>console.log("admin can delete the cart "));




export default router;
