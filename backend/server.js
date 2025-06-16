import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./config/database.js"
import cors from "cors"
import productRoutes from "./routes/product.route.js"
import userRoutes from "./routes/users.route.js"
import authRoutes from "./routes/auth.route.js"
import historyRoutes from "./routes/history.route.js"
import orderRoutes from "./routes/order.route.js"
import razorpayRoutes from "./routes/razorpay.route.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use("/api/cardata", productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/history", historyRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/razorpay", razorpayRoutes)
 
app.listen(PORT, () =>{
    connectDB();
    console.log('Server started at http://localhost:'+PORT)
})
