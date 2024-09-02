import ApiResponse from "../utils/ApiResponse.js";
import { getUserFromMap } from "../services/usermap.js"

const verifyUser = (req, res, next) => {
    const userSID = req.cookies?.SID 
    
    if (!userSID){
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized access"))
    } else {
        const user = getUserFromMap(userSID)
        if (!user){
            return res.status(401).json(new ApiResponse(401, {}, "Unauthorized access"))
        } else {
            req.user = user
            req.SID = userSID
            next()
        }
    }
}

export { verifyUser }