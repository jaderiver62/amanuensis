const router = require('express').Router();

const noteRoutes = require('../routes/apiRoutes');

router.use(noteRoutes);
module.exports = router;