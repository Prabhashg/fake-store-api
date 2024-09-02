import { Router } from "express";
import { getAllProducts, getProductwithId, createProduct, getLength } from "../controllers/product.controller.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";

const router = Router()

router
    .route("/")
    .get(getAllProducts)

router
    .route("/length")
    .get(getLength)

router
    .route("/:id")
    .get(getProductwithId)

router
    .route("/register")
    .post(verifyUser, createProduct)



export default router;