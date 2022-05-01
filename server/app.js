const App = require("./index");
const RouteOne = require('./teacherRoute')
const express = require("express")();
let TeacherApp = new App(express);

TeacherApp.use('/teachers',RouteOne)
TeacherApp.listen()