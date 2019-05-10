const express = require('express');
const router = express.Router();
let check = require('../middlewar/checkRole')


/* GET home page */
router.get('/', (req, res, next) => {

  res.render('index', { user: req.user });
});

module.exports = router;
