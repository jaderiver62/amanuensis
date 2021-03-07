const router = require('express').Router();
const shortid = require('shortid');
const { filterByQuery,
	findById,
	createNewNote,
	deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/note.json')

router.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);

    }
    res.json(results);j
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
    req.body.id = shortid.generate();
    const note = createNewNote(req.body, notes);
    res.json(note);
});
router.delete('/api/notes/:id', (req, res) => {
    const note = deleteNote(req.params.id, notes);
    res.json(note);
});