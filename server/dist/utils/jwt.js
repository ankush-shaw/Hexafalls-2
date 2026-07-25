"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_js_1 = require("../config/app.config.js");
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, app_config_js_1.jwtConfig.secret, {
        expiresIn: app_config_js_1.jwtConfig.expiresIn,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, app_config_js_1.jwtConfig.refreshSecret, {
        expiresIn: app_config_js_1.jwtConfig.refreshExpiresIn,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, app_config_js_1.jwtConfig.secret);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, app_config_js_1.jwtConfig.refreshSecret);
};
exports.verifyRefreshToken = verifyRefreshToken;
