import express from "express";
import cors from "cors";
import { connectDb } from "./config/database.js";
import authRoute from "./router/auth.route.js"
import productRoute from "./router/product.route.js"




const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

connectDb();


app.use("/api", authRoute);
app.use("/api", productRoute);





app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));