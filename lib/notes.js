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
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function deleteNote(id, notesArray) {
    //const result = notesArray.filter(note => note.id === id)[0];
    //return result;
    console.log("Removing.....");
    let removed = '';
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id === id) {
            removed = notesArray.splice(i, 1);
        }

    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return removed;
}


module.exports = {
    findById,
    createNewNote,
    deleteNote
};