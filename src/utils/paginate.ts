// src/utils/paginateArray.ts
export function paginateArray<T>(
  data: T[],
  page: number = 1,
  limit: number = 10
) {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  const paginatedData = data.slice(offset, offset + limit);

  return {
    data: paginatedData,
    pagination: {
      total,
      page,
      pageSize: limit,
      totalPages,
    },
  };
}
