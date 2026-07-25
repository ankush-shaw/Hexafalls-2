"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginationMeta = buildPaginationMeta;
exports.parsePaginationQuery = parsePaginationQuery;
function buildPaginationMeta(total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
}
function parsePaginationQuery(query) {
    const page = Math.max(parseInt(query.page || '1', 10), 1);
    const limit = Math.min(parseInt(query.limit || '20', 10), 100);
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}
