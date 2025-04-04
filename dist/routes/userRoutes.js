"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/adminRoutes.ts
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
router.post("/", UserController_1.default.createUser);
router.get("/:id", UserController_1.default.getUser);
router.put("/:id", UserController_1.default.updateUser);
router.delete("/:id", UserController_1.default.deleteUser);
exports.default = router;
