import express from "express";
import dotenv from "dotenv";
import "@/models";
import sequelize from "./database";
import apiRoutes from "@/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", apiRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected", PORT);
  } catch (error) {
    console.error("DB connection failed:", error);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
