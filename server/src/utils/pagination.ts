export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
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

export function parsePaginationQuery(query: Record<string, string>): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const limit = Math.min(parseInt(query.limit || '20', 10), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
