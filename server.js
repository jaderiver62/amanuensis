const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


function filterByQuery(query, notesArray) {

    let filteredResults = notesArray;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }

    return filteredResults;

}

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


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});