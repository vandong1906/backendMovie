"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    async createUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: "User name and password exits" });
            }
            const checkUser = await UserService_1.default.getUserByEmail(email);
            if (checkUser) {
                res
                    .status(400)
                    .json({ message: "User name and password are required" });
            }
            else {
                const User = await UserService_1.default.createUser(email, password);
                res.status(201).json(User);
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUser(req, res) {
        try {
            const { id } = req.params;
            const User = await UserService_1.default.getUserById(Number(id));
            res.status(200).json(User);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const User = await UserService_1.default.updateUser(Number(id), email, password);
            res.status(200).json(User);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService_1.default.deleteUser(Number(id));
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res
                    .status(400)
                    .json({ message: "User name and password are required" });
            }
            const { accessToken, refreshToken, user } = await UserService_1.default.login(email, password);
            if (user.email != undefined) {
                res.cookie("token", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 15 * 60 * 1000,
                    sameSite: "strict",
                });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    sameSite: "strict",
                });
                res.status(201).json(user);
            }
            else {
                res.status(401).json("password or email incorrect");
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async logout(req, res) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res.status(200).json({ message: "Logged out successfully" });
        }
        catch (error) {
            res.status(500).json({ error: "Logout failed" });
        }
    }
    async createAdmin(req, res) {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required" });
            }
            else {
                const admin = await UserService_1.default.createAdmin(email, password);
                res.status(201).json({ message: "Admin created successfully", admin });
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
