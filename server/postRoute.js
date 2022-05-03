const express = require('express');
const router = express.Router();
const App = require('./index');
const POSTPARSER = new App(express)

router.post('/', POSTPARSER._parser, function (req, res) {
    // create user in req.body
    res.send(req.body);
  })




module.exports = router