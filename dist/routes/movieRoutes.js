"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/movieRoutes.ts
const express_1 = require("express");
const MovieController_1 = __importDefault(require("../controllers/MovieController"));
const router = (0, express_1.Router)();
router.post("/", MovieController_1.default.createMovie);
router.get("/:id", MovieController_1.default.getMovie);
router.put("/:id", MovieController_1.default.updateMovie);
router.delete("/:id", MovieController_1.default.deleteMovie);
exports.default = router;
