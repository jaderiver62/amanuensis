const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


module.exports = router;
