import express from "express";



const router = express.Router();

//private
router.post("/maintenance", ()=>console.log("Raise request") );

router.get("/maintenance", ()=> console.log("My requests "));



//admin
router.get("/maintenance/admin/all", ()=>console.log(" All requests") );


router.put("/maintenance/:id", ()=>console.log("Update request status "));




export default router;