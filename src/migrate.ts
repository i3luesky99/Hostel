import { sequelize } from "./database";
import * as path from "path";
import * as fs from "fs";

async function migrate(direction: "up" | "down" = "up") {
  try {
    // Get all migration files
    const migrationsDir = path.join(__dirname, "migrations");
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".ts"))
      .sort();

    // Run each migration
    for (const file of migrationFiles) {
      const migration = require(path.join(migrationsDir, file));
      if (direction === "up") {
        await migration.up(sequelize.getQueryInterface());
        console.log(`Migration ${file} completed successfully`);
      } else {
        await migration.down(sequelize.getQueryInterface());
        console.log(`Rollback ${file} completed successfully`);
      }
    }

    console.log(`All ${direction} operations completed successfully`);
    process.exit(0);
  } catch (error) {
    console.error(`${direction} operation failed:`, error);
    process.exit(1);
  }
}

// Get the command line argument for direction
const direction = process.argv[2] === "down" ? "down" : "up";
migrate(direction);
