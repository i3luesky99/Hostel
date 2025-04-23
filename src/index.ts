import express from "express";
import { sequelize } from "./database";
import { User } from "./models/user.model";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (_, res) => {
  await sequelize.sync();
  const users = await User.findAll();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = await User.create({ username: req.body.username });
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
