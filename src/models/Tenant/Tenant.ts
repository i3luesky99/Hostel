import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/database";

export class Tenant extends Model { }

Tenant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_card_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    bank_account: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: "Tenant",
    tableName: "tenants",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
