const express = require("express");

const app = express();

let notes = [
  {
    id: 1,
    title: "Learn JavaScript",
    content: "Practice JavaScript fundamentals and DOM manipulation",
    createdAt: "2026-11-01",
  },
  {
    id: 2,
    title: "Learn React",
    content: "Understand components, props, and useState",
    createdAt: "2026-11-02",
  },
  {
    id: 3,
    title: "Learn Node.js",
    content: "Practice Node.js and Express basics",
    createdAt: "2026-11-03",
  },
];

app.use(express.json());

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newNote = {
    id: "00",
    title,
    content,
    createdAt: new Date(),
  };

  notes.push(newNote);

  res.status(201).json({
    message: "Note created successfully",
    note: newNote,
  });
});

app.get("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);

  const note = notes.find((note) => note.id === noteId);

  res.json(note);
});

app.put("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);

  const note = notes.find((note) => note.id === noteId);

  const { title, content } = req.body;

  note.title = title;
  note.content = content;

  res.json({
    message: "Note updated successfully",
    note,
  });
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);

  const noteIndex = notes.findIndex((note) => note.id === noteId);

  notes.splice(noteIndex, 1);

  res.json({
    message: "Note deleted successfully",
  });
});

app.listen(6000, () => {
  console.log("http://localhost:6000");
});
