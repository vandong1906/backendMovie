"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/movieRoutes.ts
const express_1 = require("express");
const MovieController_1 = __importDefault(require("../controllers/MovieController"));
const upload_1 = require("../utils/upload");
const authenciacne_1 = require("../utils/authenciacne");
const router = (0, express_1.Router)();
router.route('/:id')
    .put([authenciacne_1.authMiddleware, authenciacne_1.isAdmin, upload_1.uploadConfigs.movie], MovieController_1.default.updateMovie)
    .delete([authenciacne_1.authMiddleware, authenciacne_1.isAdmin], MovieController_1.default.deleteMovie);
router.route('/')
    .post([authenciacne_1.authMiddleware, authenciacne_1.isAdmin, upload_1.uploadConfigs.movie], MovieController_1.default.createMovie);
router.get('/:id', MovieController_1.default.getMovie);
router.get('/', MovieController_1.default.getAllMovies);
exports.default = router;
