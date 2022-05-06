"use strict";
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors')
class App {
  constructor(server) {
    this.server = server;
    this._port = process.env.SERVER_PORT_NUMBER || 3031;
    this._parser=bodyParser.json
    this._cors = cors
    this.router = this.server.Router
  }
  getServer = () => {
    return this.server;
  };
  setServer = (server) => {
    return (this.server = server);
  };
  listen = () => {
    return this.server.listen(this._port, () => {
      console.log("listening on " + this._port);
    });
  };
  use = (urlPattern, handler) => {
    if (urlPattern && handler) {
      return this.server.use(urlPattern, handler);
    } else if (urlPattern) {
      return this.server.use(urlPattern);
    } else {
      return new Error("Route-Handler undefined");
    }
   
  };
  get=(path,callbackFunc)=>{
return this.server.get(path,callbackFunc)
  }
  post=(path,parser,callbackFunc)=>{
    return this.server.post(path,parser,callbackFunc)
  }
  put=(path,callbackFunc)=>{
    return this.server.put(path,callbackFunc)
  }
  patch=(path,callbackFunc)=>{
    return this.server.patch(path,callbackFunc)
  }
  delete=(path,callbackFunc)=>{
    return this.server.delete(path,callbackFunc)
  }
}

module.exports = App;
