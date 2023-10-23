const express = require('express');
const path = require('path');
const uuid = require('../helper/uuid');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  
  const { title, text } = req.body;

  if (title && text) {
    const newNotes = {
      title,
      text,
      note_id: uuid(),
    };
    res.json(newNotes);
  } else {
    res.status(400).send('Title and text are required');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});