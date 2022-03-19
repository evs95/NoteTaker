const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newTip = {
      title,
      text,
      id: uuid()
    };

    readAndAppend(newTip, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for notes
notes.delete('/:id', (req, res) => {
  let id = req.params.id

  if(id)
  {
    deleteFromFile(id,'./db/db.json');
    res.json(`Note deleted successfully 🚀`);
  }
  else
  res.error('Error in deleting note');
});

module.exports = notes;
