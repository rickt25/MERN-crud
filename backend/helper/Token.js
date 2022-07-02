import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return jwt.sign(
            payload, 
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: process.env.TOKEN_EXPIRE}
        );
}