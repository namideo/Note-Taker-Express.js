const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

const uuid = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

fs.readFile("./db/db.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const notes = JSON.parse(data);

    app.get("/notes", (req, res) =>
      res.sendFile(path.join(__dirname, "/public/notes.html"))
    );

    app.get("/api/notes", (req, res) => {
      console.info(`GET /api/notes`);
      res.json(notes);
    });

    app.post("/api/notes", (req, res) => {
      let newNote = req.body;
      newNote.id = uuid.v4();

      const response = {
        status: "success",
        body: newNote,
      };

      notes.push(newNote);
      addNote();

      res.json(response);
    });

    app.get("/api/notes/:id", (req, res) => {
      if (req.params.id) {
        console.info(`GET /api/notes`);
        const noteId = req.params.id;
        console.log("note Id: " + noteId);
        for (let i = 0; i < notes.length; i++) {
          const currentNote = notes[i];
          if (currentNote.id === noteId) {
            res.json(currentNote);
            return;
          }
        }
        res.status(404).send('Note not found');
      } else {
        res.status(400).send('Note ID not provided');
      }
    });

    app.delete("/api/notes/:id", (req, res) => {
      console.info(`DELETE /api/notes`);
      const noteId = req.params.id;
      for (let i = 0; i < notes.length; i++) {
        const currentNote = notes[i];
        if (currentNote.id === noteId) {
          notes.splice(i, 1);
          return;
        }
      }
      addNote();
      res.json(notes);      
    });

    app.get("*", (req, res) =>
      res.sendFile(path.join(__dirname, "/public/index.html"))
    );

    // Write updated reviews back to the file
    function addNote() {
      fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (writeErr) =>
        writeErr ? console.error(writeErr) : console.info("Success")
      );
    }
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
