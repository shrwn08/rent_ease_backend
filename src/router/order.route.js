import express from "express";
import { createOrder,getMyOrders, getOrder, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

//private
router.post("/orders", protect, createOrder);

router.get("/orders", protect, getMyOrders);

router.get("/orders/:id", protect, getOrder);
//admin
router.get("/orders/admin/all", protect, authorize("admin"), getAllOrders
);

router.put("/orders/:id/status", protect, authorize("admin"), updateOrderStatus
);

export default router;
