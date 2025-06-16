import { USER_ROLES } from "@/models/User/User";
import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert(
    "users",
    [
      {
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        phone: "0123456789",
        role: USER_ROLES.ADMIN, // ADMIN
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "john_doe",
        email: "john@example.com",
        password: "user123",
        phone: "0987654321",
        role: USER_ROLES.USER, // USER
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
