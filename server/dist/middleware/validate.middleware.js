"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const apiError_js_1 = require("../utils/apiError.js");
const validate = (schema, target = 'body') => {
    return (req, _res, next) => {
        const result = schema.safeParse(req[target]);
        if (!result.success) {
            const formatted = result.error.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            return next(new apiError_js_1.BadRequestError('Request validation failed.', formatted));
        }
        req[target] = result.data;
        next();
    };
};
exports.validate = validate;
exports.default = exports.validate;
