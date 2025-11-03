import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET
 export const auth=(req, res,next) => {
  const token = req.cookies.token;
// console.log(JWT_SECRET)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user=decoded
//    console.log(decoded)
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }


  next();
};