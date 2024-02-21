// import the necessary modules
const express = require('express');
const path = require('path');
// import the notesRoutes from the notes.js file
const notesRoutes = require('./notes.js');
// set the PORT to the process.env.PORT or 3001
const PORT = process.env.PORT || 3001;
// create an instance of the express server
const app = express();
// set up the express app to handle data parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use the notesRoutes
app.use('/api/notes', notesRoutes);
// serve the static files in the public directory
app.use(express.static('public'));
// set up the routes to serve the notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// set up the routes to serve the index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// listen on the PORT and console log the PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);