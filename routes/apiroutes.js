const router = require('express').Router();

const { readAndAppend, writeToFile, readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid'); // For generating unique note IDs


// TODO: Define the path to the database JSON file
const filePath = ('db/db.json');

router.get('/notes', (req, res) => {
  readFromFile(filePath)
  .then((data) => res.json (JSON.parse(data)))
  .catch((err) => {
    res.status(500).json(err)
  // TODO: Use the readFromFile helper to read the notes from the JSON file
  // TODO: Parse the file data into a JavaScript object and send it as a JSON response
   
    });
});


router.post('/notes', (req, res) => {
  const {title, text} = req.body
    // TODO: Destructure the title and text from the request body

    // TODO: Return a 400 error if the title or text is missing
  if (!title || !text) {
    return res.status(400).json({error: 'Note title and text required!'})
  }
    // TODO: Create a new note object with a unique id
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // TODO: Use readAndAppend helper to add the new note to the JSON file
    readAndAppend(newNote, filePath);
    res.json(newNote);

    // TODO: Send the newly added note as a response

});

// BONUS 
// router.delete('/notes/:id', (req, res) => {
//   // TODO: Get the ID of the note to delete from the request parameters

//   // TODO: Read the current notes from the JSON file

//   // TODO: Parse the data into an array of notes

//   // TODO: Filter the notes array to remove the note with the matching ID
     
//   // TODO: Write the updated notes array back to the JSON file
     
//   // TODO: Send a response indicating the note was successfully deleted

//   // TODO: Handle any errors that occur during the file operations
// });

module.exports = router; 