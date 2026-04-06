import express from "express";
import {getProducts, getProduct, createProduct, updateProduct} from "../router/product.route.js"
import { authorize, protect } from "../middlewares/auth.middleware.js";



const router = express.Router();


router.get("/products", getProducts);

router.get("/products/:id", getProduct);

//admin
router.post("/products", protect, authorize, createProduct );

router.put("/products/:id", protect, authorize, updateProduct );

router.delete("/products/:id", ()=>console.log("admin can delete the product"));




export default router;
