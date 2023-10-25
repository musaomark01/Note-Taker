const express = require('express');
const fs =require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid');
const cors = require('cors');
const app = express();
const port =  process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for note`);
  fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading data from the file');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid4(),
    }; fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error reading data from the file');
      } else {
        const existingNotes = JSON.parse(data);
        existingNotes.push(newNote);

        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(existingNotes), (err) => {
          if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error writing data to the file');
          } else {
            res.json(newNote);
          }
        });
      }
    });
  } else {
    res.status(400).send('Title and text are required');
  }
});

app.get('/note', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); 