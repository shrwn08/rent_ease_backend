import express from "express";
import { register, login, getMe, updateProfile } from "../controllers/auth.controller.js";
import {protect} from "../middlewares/auth.middleware.js"



const router = express.Router();


router.post("/auth/register", register);
router.post("/auth/login", login);

//JWT 
router.get("/auth/me", protect, getMe);

router.put("/auth/profile", protect, updateProfile);



export default router;
