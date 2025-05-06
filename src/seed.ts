import { sequelize } from "./database";
import * as path from "path";
import * as fs from "fs";

async function seed(direction: "up" | "down" = "up") {
  try {
    // Get all seeder files
    const seedersDir = path.join(__dirname, "seeders");
    const seederFiles = fs
      .readdirSync(seedersDir)
      .filter((file) => file.endsWith(".ts"))
      .sort();

    // Run each seeder
    for (const file of seederFiles) {
      const seeder = require(path.join(seedersDir, file));
      if (direction === "up") {
        await seeder.up(sequelize.getQueryInterface());
        console.log(`Seeder ${file} completed successfully`);
      } else {
        await seeder.down(sequelize.getQueryInterface());
        console.log(`Rollback seeder ${file} completed successfully`);
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
seed(direction);
