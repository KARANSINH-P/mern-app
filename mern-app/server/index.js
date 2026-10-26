require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const Todo = mongoose.model("Todo", new mongoose.Schema({
  text: String,
  done: { type: Boolean, default: false },
}));

app.get("/api/todos", async (req, res) => res.json(await Todo.find()));
app.post("/api/todos", async (req, res) => res.json(await Todo.create(req.body)));
app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(process.env.PORT, () => console.log("Server running"))
);