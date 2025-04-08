"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/UserService.ts
const user_1 = __importDefault(require("../models/user"));
class UserService {
    // Create a new User
    async createUser(User_name, password) {
        const user = await user_1.default.create({ User_name, password });
        return user;
    }
    // Get User by ID
    async getUserById(User_id) {
        const user = await user_1.default.findByPk(User_id);
        if (!user)
            throw new Error("User not found");
        return user;
    }
    // Update User
    async updateUser(User_id, User_name, password) {
        const user = await user_1.default.findByPk(User_id);
        if (!user)
            throw new Error("User not found");
        if (User_name)
            user.User_name = User_name;
        if (password)
            user.password = password;
        await user.save();
        return user;
    }
    // Delete User
    async deleteUser(User_id) {
        const user = await user_1.default.findByPk(User_id);
        if (!user)
            throw new Error("User not found");
        await user.destroy();
        return { message: "User deleted successfully" };
    }
    async login(User_name, password) {
        const user = await user_1.default.findOne({ where: {
                User_name: User_name,
                password: password
            } });
        return user;
    }
}
exports.default = new UserService();
