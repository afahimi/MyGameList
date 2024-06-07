/* eslint-env node */

import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  "6158fcd5fed72223ec67e831622418685be89a5098e7d766c5c7514370a43b68";

const { Client } = pg;

dotenv.config();

const app = express();
const port = 3000;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

await client.connect();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  console.log("POST /register");
  const { username, password, email } = req.body;

  console.log(username, password, email);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await client.query(
      `INSERT INTO users (username, hashed_password, email) VALUES ($1, $2, $3)`,
      [username, hashedPassword, email]
    );
    res.status(201).json({ message: "User created", user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  console.log("POST /login");
  const { username, password } = req.body;

  try {
    const result = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const response = {
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };

    console.log("token: ", token);

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/search", async (req, res) => {
  console.log("POST /search");
  const query = req.body.query;

  console.log("query: ", query);

  try {
    const result = await client.query(
      `SELECT distinct title, publisher, release_date, description from game where LOWER(title) like LOWER($1) order by title`,
      [`%${query}%`]
    );
    // console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/images", express.static("./images"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
