const router = require('express').Router();
const {filterByQuery, findById, createNewNote} = require('../../lib/notes')
const {notes} = require('../../db/db');

router.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);

    }
    res.json(results);
});
router.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});
router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

module.exports = router;