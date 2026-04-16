import express from "express";
import cors from "cors";
import { connectDb } from "./config/database.js";
import { seedDB } from "./config/seed.js";
import authRoute from "./router/auth.route.js"
import productRoute from "./router/product.route.js"
import cartRoute from "./router/cart.route.js"
import maintenanceRoute from "./router/maintenace.route.js"
import adminRoute from "./router/userAdmin.route.js"
import orderRoute from "./router/order.route.js"




const app = express();
const PORT = 8080;

app.use(cors({origin  : "*"}));
app.use(express.json());

connectDb();


app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);
app.use("/api", maintenanceRoute);
app.use("/api", adminRoute);





app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));