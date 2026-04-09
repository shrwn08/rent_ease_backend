import express from "express";
import {createRequest, getMyRequests, getAllRequests, updateRequest} from "../controllers/maintenance.controller.js"
import { protect, authorize } from "../middlewares/auth.middleware.js";



const router = express.Router();

//private
router.post("/maintenance", protect,createRequest );

router.get("/maintenance", protect, getMyRequests);



//admin
router.get("/maintenance/admin/all", protect, authorize("admin"), getAllRequests);


router.put("/maintenance/:id",protect, authorize("admin"), updateRequest);




export default router;