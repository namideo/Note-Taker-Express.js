const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;

const app = express();

const notes = require('./db/db.json');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.info(`GET /api/notes`);
    res.status(200).json(notes);
  });

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    });



// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);





  
    //   for (let i = 0; i < notes.length; i++) {
    //     const currentNote = notes[i];
    //     if (currentNote.notes === noteId) {
    //       res.json(currentNote);
    //       return;
    //     }
    //   }
 
  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);