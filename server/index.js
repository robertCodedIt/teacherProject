"use strict";

class App {
  constructor(server) {
    this.server = server;
    this._port=3030
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
  use = (handler, route) => {
    if (handler && route) {
      return this.server.use(handler, route);
    } else if (handler) {
      return this.server.use(handler);
    } else {
      return new Error("Route undefined");
    }
  };
}

module.exports = App;
