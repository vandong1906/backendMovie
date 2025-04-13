import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import  dotenv from "dotenv";
dotenv.config({ path: './.env' });
interface UserRequest extends Request {
    cookies: { [key: string]: string | undefined };
    user?: UserPayload;
}
interface UserPayload {
    id: number;
    role: "admin" | "user";
}

const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    
    if( req.cookies.token){
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "No token provided" });
       }
       try {
           req.user = jwt.verify(token as string, process.env.JWT_SECRET || "") as UserPayload;
   
           next();
       } catch (error) {
            res.status(401).json({ error: "Invalid token" }); // Return to stop execution
       }
    }
     else {
        res.status(401).json({ error: "Invalid token" }); 
     }

    
};

const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
        res.status(401).json({ error: "No refresh token provided" });
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "") as UserPayload;
        
        // Generate new access token
        const accessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_SECRET || "",
            { expiresIn: "15m" } // Short-lived access token
        );

        // Set new access token in cookie
        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000 
        });

        res.json({ message: "Token refreshed successfully" });
    } catch (error) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
};
const isAdmin = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Forbidden: Admin access required" });
    }

    next();
};
export { authMiddleware, refreshToken,isAdmin};