import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
    userId: string;
    email: string;
}

export const createJwtToken = (payload: JwtPayload): string => {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
  };