const router = require('express').Router();
const shortid = require('shortid');
const { notes } = require('../../db/db.json');
const { findById, createNewNote, deleteNote } = require('../../lib/notes');


router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});
router.post('/notes', (req, res) => {
    req.body.id = shortid.generate();
    const note = createNewNote(req.body, notes);
    res.json(note);
});
router.delete('/notes/:id', (req, res) => {
    const note = deleteNote(req.params.id, notes);
    res.json(note);
});
module.exports = router;