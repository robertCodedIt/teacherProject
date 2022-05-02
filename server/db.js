"use strict";

class Database {
  constructor(database, connectionString) {
    this.database = database;
    this._connectionString = connectionString;
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
  connect = (databaseString) => {
    return this.database.connect(databaseString, () => {
      console.log(`Database Connected Successfully`);
    });
  };
}

module.exports = Database;
