const express = require('express');
const { notes } = require('./Develop/db/db');


const app = express();


app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});