"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const user_model_js_1 = require("../models/user.model.js");
class UserRepository {
    async findByEmail(email, includePassword = false) {
        const query = user_model_js_1.User.findOne({ email });
        if (includePassword)
            query.select('+passwordHash +refreshToken');
        return query.lean().exec();
    }
    async findById(id) {
        return user_model_js_1.User.findById(id).lean().exec();
    }
    async create(data) {
        const user = new user_model_js_1.User(data);
        return user.save();
    }
    async updateRefreshToken(userId, token) {
        await user_model_js_1.User.findByIdAndUpdate(userId, { refreshToken: token });
    }
    async updateLastLogin(userId) {
        await user_model_js_1.User.findByIdAndUpdate(userId, { lastLogin: new Date() });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
exports.default = exports.userRepository;
