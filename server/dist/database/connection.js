"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_js_1 = require("../config/app.config.js");
const logger_js_1 = __importDefault(require("../logger/logger.js"));
class DatabaseManager {
    static isConnected = false;
    static async connect() {
        if (this.isConnected) {
            logger_js_1.default.info('MongoDB is already connected.');
            return;
        }
        try {
            mongoose_1.default.set('strictQuery', true);
            await mongoose_1.default.connect(app_config_js_1.dbConfig.uri);
            this.isConnected = true;
            logger_js_1.default.info('Successfully connected to MongoDB Database.');
            mongoose_1.default.connection.on('error', (err) => {
                logger_js_1.default.error(`MongoDB connection error: ${err}`);
            });
            mongoose_1.default.connection.on('disconnected', () => {
                this.isConnected = false;
                logger_js_1.default.warn('MongoDB connection lost. Reconnecting...');
            });
        }
        catch (error) {
            logger_js_1.default.error(`Failed to connect to MongoDB: ${error}`);
        }
    }
    static async disconnect() {
        if (!this.isConnected)
            return;
        await mongoose_1.default.disconnect();
        this.isConnected = false;
        logger_js_1.default.info('MongoDB disconnected gracefully.');
    }
    static getHealth() {
        const state = mongoose_1.default.connection.readyState;
        return {
            status: state === 1 ? 'healthy' : 'unhealthy',
            isConnected: state === 1,
        };
    }
}
exports.DatabaseManager = DatabaseManager;
exports.default = DatabaseManager;
