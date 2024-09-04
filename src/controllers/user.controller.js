import * as db from "../db/index.js"
import ApiResponse from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { setUserToMap, sessionIdToUserMap } from "../services/usermap.js"

const getAllUsers = async (_, res) => {
   const result = await db.query("SELECT * FROM users")
   res.status(200).json(new ApiResponse(200, result.rows, "success"))
}

const getUserWithId = async (req, res) => {
   const { id } = req.params
   const result = await db.query("SELECT * FROM users where user_id = $1", [id])
   if(!result.rows[0]){
      res.status(404).json(new ApiResponse(404, {}, "User doesn't exist with id: $1", [id]))
   } else {
      res.status(200).json(new ApiResponse(200, result.rows[0], "success"))
   }

}


const createUser = async (req, res) => {
   const {name, email, password} = req.body
   if (!name || 
      !email ||
      !password
   ) {
      return res.status(400).json(new ApiResponse(400, {}, "All fields required"))
   } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const created_at = new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '')
      
      try {
         const result = await db.query(`INSERT INTO users(name, email, password, created_at) VALUES ($1, $2, $3, $4)`, [name, email, hashedPassword, created_at])
   
         if(result.rowCount !== 1){
            return res.status(500).json(new ApiResponse(500, {}, "Something Went Wrong"))
         } else {
            return res.status(200).json(new ApiResponse(200, result.rows[0], "user added successfully"))
         }
      } catch (error) {
         console.log(error.detail)
         return res.status(400).json(new ApiResponse(400, {}, "User with given email already exists !!"))
      }
   }
}

const loginUser = async (req, res) => {
   const { email, password} = req.body
   const result = await db.query("SELECT * FROM users WHERE email = $1", [email])
  
   if(!result.rows[0]){
      return res.status(401).json(new ApiResponse(401, {}, "Wrong Credentials"))
   } else {
      const isPasswordValid = await bcrypt.compare(password, result.rows[0].password)
      if(!isPasswordValid){
         return res.status(401).json(new ApiResponse(401, {}, "Wrong Credentials"))
      } else {
         const sessionId = uuidv4();
         setUserToMap(sessionId, result.rows[0])

         const options = {
            httpOnly: false,
            secure: false,
            path: "/",
            maxAge: 3600000
         }

         return res
                  .status(200)
                  .cookie("SID", sessionId, options)
                  .json(new ApiResponse(200, {}, "success"))
      }
   }

}

const logoutUser = async (req, res) => {
   const options = {
      httpOnly : false,
      secure : false,
      path: "/"
   }
   
   sessionIdToUserMap.delete(req.SID)
   
   return res
            .status(200)
            .clearCookie("SID", options)
            .json(new ApiResponse(200, {}, "successfully logged out"))


}

const updateUserWithId = async (req, res) => {
   res.send("Inside update user with id function")

}

const deleteUserWithId = async (req, res) => {
   const { id } = req.params
   const result = await db.query("DELETE FROM users WHERE user_id = $1", [id])
   if(result.rowCount === 1){
      res.status(200).json(new ApiResponse(200, {}, "success"))
   } else {
      res.status(400).json(new ApiResponse(400, {}, "failure"))
   }

}

export {getAllUsers, getUserWithId, createUser, loginUser, logoutUser, updateUserWithId, deleteUserWithId}