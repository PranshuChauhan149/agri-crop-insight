import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const isAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    
    if (!token) {
      return res.json({ success: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ success: false, message: "User not found" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export default isAuth;
