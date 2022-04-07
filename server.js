const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

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

      const response = {
        status: "success",
        body: newNote,
      };

      notes.push(newNote);
      addNote();

      res.json(response);
    });

    app.get("/api/notes/:id", (req, res)  => {
      console.info(`GET /api/notes`);
      res.json(notes[req.params.id]);
    });

    app.delete("/api/notes/:id", (req, res) => {
      console.info(`DELETE /api/notes`);
      res.json(notes[req.params.id]);
    });

    // Wildcard route to direct users to a 404 page
    app.get("*", (req, res) =>
      res.sendFile(path.join(__dirname, "/public/index.html"))
    );

    // POST /api/notes should receive a new note to save on the request body,
    // add it to the db.json file, and then return the new note to the client.
    // You'll need to find a way to give each note a unique id when it's saved
    // (look into npm packages that could do this for you).

    // DELETE /api/notes/:id should receive a query parameter that contains
    // the id of a note to delete. To delete a note, you'll need to read all
    // notes from the db.json file, remove the note with the given id property,
    // and then rewrite the notes to the db.json file.

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

