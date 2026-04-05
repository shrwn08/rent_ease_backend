import express from "express";



const router = express.Router();


router.get("/products", ()=> console.log("all product list"));

router.get("/products/:id", ()=> console.log("product details"));

//admin
router.post("/products", ()=>console.log("product uploaded by the admin") );

router.put("/products/:id", ()=>console.log("admin can make changes in the product") );

router.delete("/products/:id", ()=>console.log("admin can delete the product"));




export default router;
