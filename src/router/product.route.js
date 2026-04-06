import express from "express";
import {getProducts, getProduct} from "../router/product.route.js"



const router = express.Router();


router.get("/products", getProducts);

router.get("/products/:id", getProduct);

//admin
router.post("/products", ()=>console.log("product uploaded by the admin") );

router.put("/products/:id", ()=>console.log("admin can make changes in the product") );

router.delete("/products/:id", ()=>console.log("admin can delete the product"));




export default router;
