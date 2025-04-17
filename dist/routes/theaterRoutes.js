"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/theaterRoutes.ts
const express_1 = require("express");
const TheaterController_1 = __importDefault(require("../controllers/TheaterController"));
const authenciacne_1 = require("../utils/authenciacne");
const router = (0, express_1.Router)();
router.route('/:id')
    .put([authenciacne_1.authMiddleware, authenciacne_1.isAdmin], TheaterController_1.default.updateTheater)
    .delete([authenciacne_1.authMiddleware, authenciacne_1.isAdmin], TheaterController_1.default.deleteTheater);
router.route('/')
    .post([authenciacne_1.authMiddleware, authenciacne_1.isAdmin], TheaterController_1.default.createTheater);
router.get('/:id', TheaterController_1.default.getTheater);
router.get('/', TheaterController_1.default.getAllTheater);
module.exports = router;
exports.default = router;
