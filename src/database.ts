import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { config } from "@/config";

dotenv.config();

export const sequelize = new Sequelize(
  config.db.name!,
  config.db.user!,
  config.db.password!,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;