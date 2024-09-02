import userRouter from "./user.route.js"
import productRouter from "./product.route.js"

const mountRoutes = (app) => {
    app.use("/api/v1/users", userRouter)
    app.use("/api/v1/products", productRouter)
}

export default mountRoutes