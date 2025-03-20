// controllers/UserController.ts
import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { User_name, password } = req.body;
            if (!User_name || !password) {
                res.status(400).json({ message: "User name and password are required" });
            }

            const User = await UserService.createUser(User_name, password);
            res.status(201).json(User);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const User = await UserService.getUserById(Number(id));
            res.status(200).json(User);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { User_name, password } = req.body;
            const User = await UserService.updateUser(Number(id), User_name, password);
            res.status(200).json(User);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(Number(id));
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();