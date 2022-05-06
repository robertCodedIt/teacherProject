const express = require('express');
const router = express.Router();
const App = require('./index');
const POSTPARSER = new App(express)
const Todo = require('./models/TodoSchema');


router.post('/', POSTPARSER._parser(), function (req, res) {
    // create user in req.body

let todo = new Todo({
  author:req.body.author,
  description:req.body.description,
  due_date:req.body.due_date,
  completed:req.body.completed
})
todo.save()


  })




module.exports = router