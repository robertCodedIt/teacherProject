require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const Todo = require("./models/Todo");
const mongoose = require("mongoose");
const connectionStr = process.env.DB_CONNECT_STRING;

/* -------------------------------------------------------------------------- */

// connecting to mongoose
mongoose.connect(connectionStr, () => {
  console.log("Connected to mongoose");
});
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

//get methods
app.head("/", cors(), (req, res) => {
  console.info("HEAD success");
  res.sendStatus(204);
});
app.get("/", cors(), (req, res) => {
  console.log("all got");
  res.send({
    message: {
      name: "all clear",
      status: 200,
    },
  });
});
app.head("/alltodos", cors(), (req, res) => {
  console.info("HEAD success");
  res.sendStatus(204);
});
app.get("/alltodos", cors(), async (req, res) => {
  console.info("GET route successful");
  let todos = await Todo.find({});
  res.json(todos);
});

// post with options found on github
const optionsTwo = {
  origin: true,
  methods: ["POST","PUT"],
  credentials: true,
  maxAge: 3600,
};
app.options("/newtodo", cors(optionsTwo));

app.post("/newtodo", cors(optionsTwo), bodyparser.json(), async (req, res) => {
  console.info("post route successful");
  const newtodo = new Todo(req.body);
  await newtodo.save(function (err) {
    if (err) {
      console.info(err);
    }
  });
  res.send({
    message: newtodo,
  });
});

/* -------------------------------------------------------------------------- */
// delete method
app.options("/deletetodo/:id", cors());
app.delete("/deletetodo/:id", cors(), async (req, res) => {
  await Todo.deleteOne({ date_id: req.params.id });
  console.info("DELETE route successful");
  res.send({
    message: "deleted",
  });
});

//update not working
app.options("/updatetodo/:id", cors(optionsTwo));
app.put("/updatetodo/:id", cors(optionsTwo), (req, res) => {
  Todo.findOne(req.params.id, function (err, result) {
    if (!result) res.status(404).send({ message: "todo does not exist" });
    console.log("PUT - /updatetodos/" + req.params.id);
    result.description = req.body.description;

    Todo.save(result, function (err, data) {
      if (err) return res.send(500, err.message);
      console.log("Successfully updated: " + req.body.description);
      res.status(200).send(result);
    });
  });

  console.info("put route successful");
  res.send({
    message: "putted",
  });
});

const port = process.env.SERVER_PORT_NUMBER || 3031;
// listen method
app.listen(port, () => {
  console.log("Express server listening on port " + port + ".");
});
