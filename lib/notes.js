const path = require('path');
const fs = require('fs');
const shortid = require("shortid");
const { notes } = require('./db/db.json');


function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function deleteNote(id, notesArray) {

    console.log("Removing.....");
    console.log(findById(id, notesArray));
    const newNotesArray = notesArray.filter(note => note.id !== id);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: newNotesArray }, null, 2)
    );

    return newNotesArray;
}


app.get('/api/notes/', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);

    }
    res.json(results);
});
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});
app.post('/api/notes/', (req, res) => {
    req.body.id = shortid.generate();
    const note = createNewNote(req.body, notes);
    res.json(note);
});
app.delete('/api/notes/:id', (req, res) => {
    const note = deleteNote(req.params.id, notes);
    res.json(note);
});
module.exports = {
    findById,
    createNewNote,
    deleteNote
};