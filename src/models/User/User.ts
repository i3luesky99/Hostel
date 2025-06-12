import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/database";
export class User extends Model { }

export const USER_ROLES = {
  ADMIN: 0,
  USER: 1,
} as const;

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    role: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: USER_ROLES.USER, // 0: ADMIN, 1: USER
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
