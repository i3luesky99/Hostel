import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: "john_doe",
        last_name: "Doe",
      },
      {
        username: "jane_smith",
        last_name: "Smith",
      },
      {
        username: "bob_wilson",
        last_name: "Wilson",
      },
    ],
    {}
  );
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete("Users", {}, {});
}
