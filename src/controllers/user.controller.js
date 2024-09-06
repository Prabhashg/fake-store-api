import { User } from "../db/index.js";
import ApiResponse from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { setUserToMap, sessionIdToUserMap } from "../services/usermap.js"

const getAllUsers = async (_, res) => {
   try {
      const users = await User.findAll({})
      res.status(200).json(new ApiResponse(200, users, "success"))
   } catch (error) {
      console.log(error)
      res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
   }
}

const getUserWithId = async (req, res) => {
   const { id } = req.params
   try {
      const user = await User.findOne({
         where: {
            user_id : id
         }
      })

      if (!user) {
         return res.status(400).json(new ApiResponse(400, {}, `User with id: ${id} doesn't exist`))
      } 
         
      return res.status(200).json(new ApiResponse(200, user, "success"))
   } catch (error) {
      console.log(error)
      return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
   }
}


const createUser = async (req, res) => {
   const {name, email, password} = req.body
   if (!name || !email || !password) {
      return res.status(400).json(new ApiResponse(400, {}, "All fields required"))
   }

   const hashedPassword = await bcrypt.hash(password, 10)
   
   try {
      const user = await User.create({name, email, password: hashedPassword})
      res.status(201).json(new ApiResponse(201, user, "user created successfully"))         
   } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
         console.log('Email must be unique.');
         return res.status(400).json(new ApiResponse(400, {}, "Email Already Exists"))
      } else {
         console.error('An error occurred:', error);
         return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
      }
   }   
}

const loginUser = async (req, res) => {
   const { email, password} = req.body
   try {
      const user = await User.findOne({
         where : {
            email
         }
      })

      if(!user){
         return res.status(401).json(new ApiResponse(401, {}, "User doesn't exist"))
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if(!isPasswordValid){
         return res.status(401).json(new ApiResponse(401, {}, "Incorrect password"))
      }

      const sessionId = uuidv4()
      setUserToMap(sessionId, user)

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

   } catch (error) {
      console.log(error)
      return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
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
   res.status(200).json(new ApiResponse(200, {}, "Endpoint yet to be released..."))

}

const deleteUserWithId = async (req, res) => {
   const { id } = req.params

   try {
      const isDeleted = await User.destroy({
         where: {
            user_id : id
         }
      })

      if(!isDeleted){
         return res.status(400).json(new ApiResponse(401, {}, "User doesn't exist to delete"))
      }

      res.status(200).json(new ApiResponse(200, {}, "success"))
   } catch (error) {
      console.log(error)
      return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
   }
}

export {getAllUsers, getUserWithId, createUser, loginUser, logoutUser, updateUserWithId, deleteUserWithId}