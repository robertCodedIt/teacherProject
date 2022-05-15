"use strict";
require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");
const App = require("./index");
// const postRoute = require("./postRoute");
const getRoute = require("./getTodos");
const express = require("express")();
const Database = require("./db");
const Todo = require("./models/TodoSchema");
let RootApp = new App(express);
let serverDataBase = new Database(mongoose);
serverDataBase.setConnectionString(process.env.DB_CONNECT_STRING);
serverDataBase.connect();
RootApp.get("/", (req, res) => {
  res.send("hello world");
});
RootApp.post("/newtodo", RootApp._parser(), async (req, res) => {
  let todo = new Todo({
    author: req.body.author,
    description: req.body.description,
    due_date: req.body.due_date,
    completed: req.body.completed,
  });
todo.save();
res.send(todo)
});
RootApp.delete("/deletetodo",async (req, res) => {
 let deleted = await Todo.deleteOne({})
res.send(deleted)
})
// RootApp.use("/newtodo",postRoute)

RootApp.use(cors());

RootApp.use("/gettodo", getRoute);
// TeacherApp.use("/gettodo",getRoute)
RootApp.listen();

