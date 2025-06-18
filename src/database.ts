import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";

dotenv.config();

export const sequelize = new Sequelize(
  DB_NAME!,
  DB_USER!,
  DB_PASSWORD!,
  {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;