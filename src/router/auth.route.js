import express from "express";
import { register } from "../controllers/auth.controller.js";



const router = express.Router();


router.post("/auth/register", register);
router.post("/auth/login", ()=>console.log("useris logged in"));

//JWT 
router.get("/auth/me", ()=>console.log("it will help user to logged in"));

router.put("/auth/profile", ()=>console.log("to upload users profile"))



export default router;
