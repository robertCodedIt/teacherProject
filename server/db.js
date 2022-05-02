"use strict";

class Database {
  constructor(database, connectionString) {
    this.database = database;
    this._connectionString="";
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
}

module.exports = Database;
