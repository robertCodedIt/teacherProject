"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const App = require("./index");
const RouteOne = require("./teacherRoute");
const express = require("express")();
const Database = require("./db");
let TeacherApp = new App(express);
let serverDataBase = new Database(mongoose);
serverDataBase.setConnectionString(process.env.DB_CONNECT_STRING)
serverDataBase.connect();

TeacherApp.use("/teachers", RouteOne);
TeacherApp.listen();
