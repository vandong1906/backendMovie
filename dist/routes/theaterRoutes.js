"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/theaterRoutes.ts
const express_1 = require("express");
const TheaterController_1 = __importDefault(require("../controllers/TheaterController"));
const router = (0, express_1.Router)();
router.post("/", TheaterController_1.default.createTheater);
router.get("/:id", TheaterController_1.default.getTheater);
router.put("/:id", TheaterController_1.default.updateTheater);
router.delete("/:id", TheaterController_1.default.deleteTheater);
router.get("/", TheaterController_1.default.getAllTheater);
exports.default = router;
