const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.json({
    message: "Hackathon Task Manager API is running 🚀",
  });
});

app.get("/api/tasks", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Task title is required",
    });
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({
    message: "Task deleted successfully",
  });
});

app.patch("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});