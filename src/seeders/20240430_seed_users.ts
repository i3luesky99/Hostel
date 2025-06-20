import { USER_ROLES } from "@/models/User/User";
import { QueryInterface } from "sequelize";
import bcrypt from "bcryptjs";
import { config } from "@/config";

export async function up(queryInterface: QueryInterface): Promise<void> {
  const adminPassword = await bcrypt.hash("admin123", config.bcrypt.saltRounds);
  const userPassword = await bcrypt.hash("user123", config.bcrypt.saltRounds);

  await queryInterface.bulkInsert(
    "users",
    [
      {
        username: "admin",
        email: "admin@example.com",
        password: adminPassword,
        phone: "0123456789",
        role: USER_ROLES.ADMIN,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "john_doe",
        email: "john@example.com",
        password: userPassword,
        phone: "0987654321",
        role: USER_ROLES.USER,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete("users", {
    username: ["admin", "john_doe"],
  });
}
