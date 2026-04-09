import express from "express";
import {getAllUsers, getUser} from "../controllers/user.controller.js"
import { protect, authorize } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.use( protect, authorize("admin"));


//admin

router.get("/users", getAllUsers);

router.get("/users/:id", getUser);

router.put("/users/:id/toggle", ()=>console.log("Activate/deactivate") );





export default router;