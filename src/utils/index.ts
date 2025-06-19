// src/utils/paginate.ts
import { FindAndCountOptions, ModelStatic } from "sequelize";

export async function paginate<T>(
  model: ModelStatic<any>,
  page: number = 1,
  limit: number = 10,
  options: Omit<FindAndCountOptions, "limit" | "offset"> = {}
) {
  const offset = (page - 1) * limit;

  const { count, rows } = await model.findAndCountAll({
    ...options,
    limit,
    offset,
  });

  return {
    data: rows,
    pagination: {
      total: count,
      page,
      pageSize: limit,
      totalPages: Math.ceil(count / limit),
    },
  };
}
