import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../../services/jwtService.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: 'No token provided',
                errorCode: 1,
            })
        }
        const tokenReceived = authHeader.split(" ")[1]
        const verifyToken = verifyJwtToken(tokenReceived);
        if (!verifyToken) {
            return res.status(401).json({ 
                message: "Invalid or expired token",
                errorCode: 1,
            });
        }
        req.user = verifyToken;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ 
            message: "Invalid or expired token",
            errorCode: 1,
        });
    }

}