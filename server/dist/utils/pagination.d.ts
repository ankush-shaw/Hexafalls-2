export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export declare function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta;
export declare function parsePaginationQuery(query: Record<string, string>): {
    page: number;
    limit: number;
    skip: number;
};
