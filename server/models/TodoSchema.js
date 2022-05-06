const mongoose = require("mongoose");
const Database = require("../db");
const Dataset = new Database(mongoose);

const TodoSchema = new Dataset.Schema({
    author:{
        type:String,
        required:true,
    },
  description: {
type:String,
    required: true,
    maxLength: [255,"max length is 255 characters"],
  },
  due_date: {
    required: true,
    type:Date,
  },
  completed: { required: true, type: Boolean },

});

let Todo = Dataset._model("Todo", TodoSchema);
module.exports = Todo;
