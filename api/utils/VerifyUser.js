import jwt from "jsonwebtoken";
import { errorHandler } from "./error";

export const VerifyUser = (req, res, next) => {
      const token = req.cookies.access_token; // Assuming the token is stored in cookies
      if (!token) {
        return next(errorHandler(401, "You are not authenticated!"));
                  
      } 
}