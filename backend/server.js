const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello Backend");
});

pool.connect((err, client, res) => {
  console.log("Connected Postgres Database: ", client.database);
});

// get all todos
app.get("/todos/:userEmail", async (req, res) => {
  //   console.log(req);
  const { userEmail } = req.params; // req.params.userEmail
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
});

// Create a todo
app.post("/todos", (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const newTodo = pool.query(
      `INSERT INTO todos (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );

    res.json(newTodo);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
