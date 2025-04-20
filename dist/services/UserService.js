"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/UserService.ts
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ticket_1 = __importDefault(require("../models/ticket"));
const payment_1 = __importDefault(require("../models/payment"));
const Show_1 = __importDefault(require("../models/Show"));
const Movie_1 = __importDefault(require("../models/Movie"));
const Theater_1 = __importDefault(require("../models/Theater"));
class UserService {
    // Create a new User
    async createAdmin(email, password) {
        const admin = await user_1.default.create({
            email,
            password: password,
            role: "admin",
        });
        return {
            User_id: admin.User_id,
            email: admin.email,
            role: admin.role,
        };
    }
    async createUser(email, password) {
        const user = await user_1.default.create({ email, password });
        return user;
    }
    async getUserByEmail(email) {
        const user = await user_1.default.findOne({
            where: {
                email,
            },
        });
        if (!user)
            return null;
        return user;
    }
    async getUserById(id) {
        const user = await user_1.default.findByPk(id, {
            include: [
                {
                    model: ticket_1.default,
                    as: "tickets",
                    include: [
                        {
                            model: payment_1.default,
                            as: "payment", // phải trùng alias
                        },
                        {
                            model: Show_1.default,
                            as: "show",
                            include: [
                                {
                                    model: Movie_1.default,
                                    as: "movie",
                                },
                                {
                                    model: Theater_1.default,
                                    as: "theater",
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!user)
            return null;
        return user;
    }
    async updateUser(User_id, email, password) {
        const user = await user_1.default.findByPk(User_id);
        if (!user)
            throw new Error("User not found");
        if (email)
            user.email = email;
        if (password)
            user.password = password;
        await user.save();
        return user;
    }
    async deleteUser(User_id) {
        const user = await user_1.default.findByPk(User_id);
        if (!user)
            throw new Error("User not found");
        await user.destroy();
        return { message: "User deleted successfully" };
    }
    async login(email, password) {
        const user = await user_1.default.findOne({
            where: {
                email: email,
                password: password,
            },
        });
        const accessToken = jsonwebtoken_1.default.sign({ id: user?.User_id, role: user?.role }, process.env.JWT_SECRET || "", { expiresIn: "5m" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user?.User_id, role: user?.role }, process.env.JWT_REFRESH_SECRET || "", { expiresIn: "7d" });
        return {
            accessToken,
            refreshToken,
            user: { id: user?.User_id, email: user?.email, role: user?.role },
        };
    }
}
exports.default = new UserService();
