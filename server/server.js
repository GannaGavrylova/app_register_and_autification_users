import express from "express";
import "dotenv/config";
import cors from "cors";
import bcrypt from "bcrypt";
import sequelize from "./config/db.js";
import User from "./models/user.js"; // импортируем модель пользователя

const app = express();
const port = process.env.PORT || 3333;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Such user already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User was registred succesfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    res.json({ message: "Success! User logged in.", data: user.name });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

app.get("/profile/:id", () => {});

app.put("/profile/:id", () => {});
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established succesfully");
    console.log(`server running on http://localhost:${port}`);
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
});
