import { Router } from "express"
import {getAllUsers, getUserWithId, createUser, loginUser, logoutUser, updateUserWithId, deleteUserWithId } from "../controllers/user.controller.js"
import { verifyUser } from "../middlewares/verifyUser.middleware.js"

const router = Router()

router
    .route("/")
    .get(getAllUsers)

router
    .route("/:id")
    .get(getUserWithId)
    .put(updateUserWithId)
    .delete(deleteUserWithId)

router
    .route("/signup")
    .post(createUser)

router
    .route("/login")
    .post(loginUser)

router
    .route("/logout")
    .post(verifyUser, logoutUser)


export default router