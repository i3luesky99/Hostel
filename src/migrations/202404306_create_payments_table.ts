// migrations/create-payments.ts
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable("payments", {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    contract_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'contracts', key: 'id' },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    total_cost: { type: DataTypes.DECIMAL, allowNull: false },
    electricity_number: { type: DataTypes.DECIMAL, allowNull: false },
    water_number: { type: DataTypes.DECIMAL, allowNull: false },
    internet_cost: { type: DataTypes.DECIMAL, allowNull: true },
    other_costs: { type: DataTypes.TEXT, allowNull: false },
    payment_date: { type: DataTypes.DATEONLY, allowNull: false },
    payment_method: { type: DataTypes.TINYINT, allowNull: false }, // 0: cash, 1: bank transfer, 2: online payment
    status: { type: DataTypes.TINYINT, allowNull: false }, // 0: pending, 1: completed, 2: failed
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable("payments");
}
