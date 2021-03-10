const path = require('path');
const fs = require('fs');



function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return note;
}

function deleteNote(id, notesArray) {

    console.log("Removing.....");
    console.log(findById(id, notesArray));
    notesArray = notesArray.filter(note => note.id !== id)[0];
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );

    return notesArray;
}


module.exports = {
    findById,
    createNewNote,
    deleteNote
};