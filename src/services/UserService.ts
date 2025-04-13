// services/UserService.ts
import User from "../models/user";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
class UserService {
    // Create a new User
    async createAdmin(email: string, password: string) {

        const admin = await User.create({
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
    async createUser(email: string, password: string) {
        const user = await User.create({ email, password });
        return user;
    }
    async getUserByEmail(email: string) {
        const user = await User.findOne({
            where:{
                email
            }
        });
        if (!user)  return null;
        return user;
    }
    async getUserById(id:number) {
        const user =User.findByPk(id);
        if (!user)  return null;
        return user;
    }
    async updateUser(User_id: number, email?: string, password?: string) {
        const user = await User.findByPk(User_id);
        if (!user) throw new Error("User not found");

        if (email) user.email = email;
        if (password) user.password = password;
        await user.save();
        return user;
    }
    async deleteUser(User_id: number) {
        const user = await User.findByPk(User_id);
        if (!user) throw new Error("User not found");

        await user.destroy();
        return { message: "User deleted successfully" };
    }
    async login(email:string,password:string){
        const user = await User.findOne({where:{
            email:email,
            password:password
        }})
        const accessToken = jwt.sign(
            { id: user?.User_id, role: user?.role },
            process.env.JWT_SECRET || "",
            { expiresIn: "5m" } 
        );
    
        const refreshToken = jwt.sign(
            { id: user?.User_id, role: user?.role },
            process.env.JWT_REFRESH_SECRET || "",
            { expiresIn: "7d" } 
        );
        return { accessToken,refreshToken, user: { id: user?.User_id, email: user?.email, role: user?.role} };
    }

}

export default new UserService();