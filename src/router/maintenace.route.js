import express from "express";
import {createRequest, getMyRequests} from "../controllers/maintenance.controller.js"
import { protect } from "../middlewares/auth.middleware.js";



const router = express.Router();

//private
router.post("/maintenance", protect,createRequest );

router.get("/maintenance", protect, getMyRequests);



//admin
router.get("/maintenance/admin/all", ()=>console.log(" All requests") );


router.put("/maintenance/:id", ()=>console.log("Update request status "));




export default router;