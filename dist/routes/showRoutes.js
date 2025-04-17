"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/showRoutes.ts
const express_1 = require("express");
const ShowController_1 = __importDefault(require("../controllers/ShowController"));
const authenciacne_1 = require("../utils/authenciacne");
const router = (0, express_1.Router)();
router.route('/:id')
    .put([authenciacne_1.authMiddleware, authenciacne_1.isAdmin], ShowController_1.default.updateShow)
    .delete([authenciacne_1.authMiddleware, authenciacne_1.isAdmin], ShowController_1.default.deleteShow);
router.route('/')
    .post([authenciacne_1.authMiddleware, authenciacne_1.isAdmin], ShowController_1.default.createShow);
// Các route GET không cần authentication
router.get('/:id', ShowController_1.default.getShow);
router.get('/', ShowController_1.default.getAllShows);
exports.default = router;
