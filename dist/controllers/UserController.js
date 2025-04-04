"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    async createUser(req, res) {
        try {
            const { User_name, password } = req.body;
            if (!User_name || !password) {
                res.status(400).json({ message: "User name and password are required" });
            }
            const User = await UserService_1.default.createUser(User_name, password);
            res.status(201).json(User);
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
            const { User_name, password } = req.body;
            const User = await UserService_1.default.updateUser(Number(id), User_name, password);
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
}
exports.default = new UserController();
