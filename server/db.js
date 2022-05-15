"use strict";

class Database {
  constructor(database) {
    this.database = database;
    this._connectionString="";
    this._model = database.model;
    this.Schema = database.Schema;
  }
  getDatabase = () => {
    return this.database;
  };
  setDatabase = (database) => {
    return (this.database = database);
  };
  setConnectionString = (connectionString) => {
    return (this._connectionString = connectionString);
  };
  connect = () => {
    return this.database.connect(this._connectionString, () => {
      console.log(`Database Connected Successfully`);
    });
  };
  create=(model)=>{
return(this._model.create(model))
  }
  save=()=>{
return(this._model.save())
  }
  readAll=()=>{
return(this._model.find())
  }
  readOne=(model)=>{
return(this._model.findOneById(model._id))
  }
  deleteOne=(model)=>{
    return(this._model.deleteOne(model))
  }
}

module.exports = Database;
