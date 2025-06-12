// migrations/create-rooms.ts
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable("rooms", {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    house_block_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'house_blocks', key: 'id' },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    room_number: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    status: { type: DataTypes.TINYINT, allowNull: false }, // 0: available, 1: occupied, 2: maintenance
    electricity_cost: { type: DataTypes.DECIMAL, allowNull: false },
    water_cost: { type: DataTypes.DECIMAL, allowNull: false },
    internet_cost: { type: DataTypes.DECIMAL, allowNull: false },
    other_costs: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable("rooms");
}
