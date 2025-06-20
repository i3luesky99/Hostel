import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  const now = new Date();

  const houseBlocks = Array.from({ length: 10 }, (_, index) => ({
    user_id: 2,
    name: `Block ${index + 1}`,
    district: `District ${index + 1}`,
    address: `123 Street ${index + 1}, City`,
    created_at: now,
    updated_at: now,
  }));

  await queryInterface.bulkInsert("house_blocks", houseBlocks);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete("house_blocks", {
    name: Array.from({ length: 10 }, (_, index) => `Block ${index + 1}`),
  });
}
