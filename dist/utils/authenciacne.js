"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Main authentication middleware
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "No token provided" });
    }
    try {
        req.user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" }); // Return to stop execution
    }
};
exports.authMiddleware = authMiddleware;
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ error: "No refresh token provided" });
    }
    try {
        // Verify refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "");
        // Generate new access token
        const accessToken = jsonwebtoken_1.default.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET || "", { expiresIn: "15m" } // Short-lived access token
        );
        // Set new access token in cookie
        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000
        });
        res.json({ message: "Token refreshed successfully" });
    }
    catch (error) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
};
exports.refreshToken = refreshToken;
