// services/UserService.ts
import User from "../models/user";

class UserService {
    // Create a new User
    async createUser(User_name: string, password: string) {
        const user = await User.create({ User_name, password });
        return user;
    }

    // Get User by ID
    async getUserById(User_id: number) {
        const user = await User.findByPk(User_id);
        if (!user) throw new Error("User not found");
        return user;
    }

    // Update User
    async updateUser(User_id: number, User_name?: string, password?: string) {
        const user = await User.findByPk(User_id);
        if (!user) throw new Error("User not found");

        if (User_name) user.User_name = User_name;
        if (password) user.password = password;
        await user.save();
        return user;
    }

    // Delete User
    async deleteUser(User_id: number) {
        const user = await User.findByPk(User_id);
        if (!user) throw new Error("User not found");

        await user.destroy();
        return { message: "User deleted successfully" };
    }
}

export default new UserService();