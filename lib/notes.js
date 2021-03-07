const fs = require('fs');
const path = require('path');


function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

function deleteNote(id, notesArray) {
    const newNotesArray = notesArray.filter(note => note.id !== id);
    const removed = findById(id, notesArray);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: newNotesArray }, null, 2)
    );

    return newNotesArray;
};

module.exports = {
	filterByQuery,
	findById,
	createNewNote,
	deleteNote
}