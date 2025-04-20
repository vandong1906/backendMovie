// routes/adminRoutes.ts
import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
router.get("/logout", UserController.logout);
router.post("/", UserController.createUser);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/login", UserController.login);
router.post("/createAdmin", UserController.createAdmin);
//router.post("/google", UserController.googleLogin);
export default router;
