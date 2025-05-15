const express = require('express');
const apiRouter = require('./api'); 
const router = express.Router();

router.use(process.env.API_BASE, apiRouter);


router.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

module.exports = router;
