import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import mountRoutes from "./src/routes/index.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

mountRoutes(app)

export default app;