"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
        type: String,
        enum: ['admin', 'manager', 'operator', 'viewer', 'guest'],
        default: 'viewer',
    },
    refreshToken: { type: String, select: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
}, { timestamps: true });
// Pre-save hook: hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash'))
        return next();
    this.passwordHash = await bcryptjs_1.default.hash(this.passwordHash, 12);
    next();
});
// Instance method: compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.passwordHash);
};
userSchema.index({ email: 1 });
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.default = exports.User;
