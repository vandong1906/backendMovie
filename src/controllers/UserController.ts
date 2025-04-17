// controllers/UserController.ts
import { Request, Response } from "express";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken";
class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "User name and password exits" });
      }
      const checkUser = await UserService.getUserByEmail(email);

      if (checkUser) {
        res
          .status(400)
          .json({ message: "User name and password are required" });
      } else {
        const User = await UserService.createUser(email, password);
        res.status(201).json(User);
      }
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
      const { email, password } = req.body;
      const User = await UserService.updateUser(Number(id), email, password);
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
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res
          .status(400)
          .json({ message: "User name and password are required" });
      }
      const { accessToken, refreshToken, user } = await UserService.login(
        email,
        password
      );
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
      } else {
        res.status(401).json("password or email incorrect");
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async logout(req: Request, res: Response) {
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
    } catch (error) {
      res.status(500).json({ error: "Logout failed" });
    }
  }
  async createAdmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      if (!email || !password) {
         res.status(400).json({ error: "Email and password are required" });
      }
      else  {
      const admin = await UserService.createAdmin(email, password );
      res.status(201).json({ message: "Admin created successfully", admin });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default new UserController();
