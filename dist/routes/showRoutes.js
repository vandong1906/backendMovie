"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/showRoutes.ts
const express_1 = require("express");
const ShowController_1 = __importDefault(require("../controllers/ShowController"));
const router = (0, express_1.Router)();
router.post("/", ShowController_1.default.createShow);
router.get("/:id", ShowController_1.default.getShow);
router.put("/:id", ShowController_1.default.updateShow);
router.delete("/:id", ShowController_1.default.deleteShow);
exports.default = router;
