// import express and express.Router
const express = require('express');
const router = express.Router();
// import fs for reading and writing files
const fs = require('fs');
const path = require('path');
// import uuid for creating unique id for each note
const { v4: uuidv4 } = require('uuid');
// set up the get, post, and delete routes
router.get('/', (req, res) => {
    // read the db.json file and return the saved notes
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // return the saved notes as JSON
    res.json(JSON.parse(data));
  });
});

router.post('/', (req, res) => {
    // get the title and text from the request body
    const { title, text } = req.body;
    // if the request body exists create a new note object with a unique id
    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuidv4(),
        };
        // read the db.json file and return the saved notes
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            // parse the saved notes and push the new note to the array
            const notes = JSON.parse(data);
            notes.push(newNote);
            // write the updated notes back to the db.json file
            fs.writeFile('./db/db.json', JSON.stringify(notes), () =>
            res.json('Note has been saved!')
            );
        }); 
    }
});

router.delete('/:note_id', (req, res) => {
    // get the note id from the request parameters
    const note_id = req.params.note_id;
    // read the db.json file and return the saved notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // parse the saved notes and filter out the note to delete
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id !== note_id);
        // write the updated notes back to the db.json file
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json('Note has been deleted!');
        });
    });
});
// export the router
module.exports = router;