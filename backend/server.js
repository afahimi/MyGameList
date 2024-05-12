/* eslint-env node */

import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

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

app.get("/titles", async (req, res) => {
  console.log("GET /titles");
  try {
    const result = await client.query(
      "SELECT distinct title from game order by title asc"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
