import express from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";



const router = express.Router();


router.post("/auth/register", register);
router.post("/auth/login", login);

//JWT 
router.get("/auth/me", getMe);

router.put("/auth/profile", ()=>console.log("to upload users profile"))



export default router;
