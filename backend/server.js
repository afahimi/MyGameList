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

app.post("/search", async (req, res) => {
  console.log("POST /search");
  const query = req.body.query;

  console.log("query: ", query);

  try {
    const result = await client.query(
      `SELECT distinct title, publisher, release_date, description from game where LOWER(title) like LOWER('%${query}%') order by title`
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.use('/images' , express.static('./images'))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
