import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/database";

export class HouseBlock extends Model { }

HouseBlock.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HouseBlock",
    tableName: "house_blocks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
