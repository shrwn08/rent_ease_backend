import express from "express";
import {getProducts, getProduct, createProduct, updateProduct, deletedProduct} from "../controllers/product.controller.js"
import { authorize, protect } from "../middlewares/auth.middleware.js";



const router = express.Router();


router.get("/products", getProducts);

router.get("/products/:id", getProduct);

//admin
router.post("/products", protect, authorize("admin"), createProduct );

router.put("/products/:id", protect, authorize("admin"), updateProduct );

router.delete("/products/:id", protect, authorize("admin"), deletedProduct);




export default router;
