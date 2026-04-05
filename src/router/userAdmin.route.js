import express from "express";



const router = express.Router();

//admin

router.get("/users ", ()=> console.log("List all users"));

router.put("/users/:id/toggle", ()=>console.log("Activate/deactivate") );





export default router;