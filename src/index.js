import express from "express";
import cors from "cors";
import { connectDb } from "./config/database.js";




const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

connectDb();





app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));