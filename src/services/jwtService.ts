import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
    userId: string;
    email: string;
}

export const createJwtToken = (payload: JwtPayload): string => {

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: "1h",
  }

  return jwt.sign(
    payload,
    secret,
    options,
  );
};

export const verifyJwtToken = (token: string): JwtPayload | any => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    const decode = jwt.verify(token, secret) as JwtPayload
    return decode;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
}