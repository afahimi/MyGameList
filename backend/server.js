/* eslint-env node */

import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const { Client } = pg;

dotenv.config();

const app = express();
const port = 3000;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.error(err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

await client.connect();
app.use(cors());
app.use(express.json());

app.get("/user-info", authenticateJWT, (req, res) => {
  const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  res.json(decodedToken);
});

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

app.post("/add-review", authenticateJWT, async (req, res) => {
  console.log("POST /add-review");
  const { title, username, review, rating } = req.body;

  console.log(title, username, review, rating);

  try {
    const game = await client.query(`SELECT id FROM game WHERE title = $1`, [
      title,
    ]);

    if (game.rows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    const game_id = game.rows[0].id;

    const existingReview = await client.query(
      `SELECT * FROM review WHERE game_id = $1 AND username = $2`,
      [game_id, username]
    );

    let newReview;
    if (existingReview.rows.length > 0) {
      newReview = await client.query(
        `UPDATE review SET review = $1, rating = $2 WHERE game_id = $3 AND username = $4 RETURNING *`,
        [review, rating, game_id, username]
      );
    } else {
      newReview = await client.query(
        `INSERT INTO review (game_id, username, review, rating, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [game_id, username, review, rating, 0]
      );
    }

    console.log(newReview.rows[0]);
    res
      .status(201)
      .json({ message: "Review added", review: newReview.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/reviews", async (req, res) => {
  console.log("GET /get-reviews");
  const { title } = req.query;

  console.log(title);

  try {
    const game = await client.query(`SELECT id FROM game WHERE title = $1`, [
      title,
    ]);

    if (game.rows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    const game_id = game.rows[0].id;

    const reviews = await client.query(
      `SELECT * FROM review WHERE game_id = $1`,
      [game_id]
    );

    console.log(reviews.rows);
    res.status(200).json(reviews.rows);
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
      SECRET_KEY
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
      `SELECT distinct title, publisher, release_date, description, star_rating from game where LOWER(title) like LOWER($1) order by title`,
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
