import express from "express";
import { createRequire } from "node:module";
import path from "path";

import { routerGet } from "./Routes/getRouter.js";

import { startHttpServer } from "./startServers/httpServ.js";
import { startSocketServer } from "./startServers/socketServ.js";

//Delete
import { routerdel } from "./Routes/delete.js";

//Adding users
import { routerAdd } from "./Routes/add.js";

//Find users
import { router } from "./Routes/find.js";

//Update
import { routerEdit } from "./Routes/edit.js";

const app = express();
const require = createRequire(import.meta.url);
let bodyParser = require("body-parser");

app.set("view engine", "html");

let allMiddleware = [
  bodyParser.urlencoded({ extended: true }),
  express.static(path.resolve("public")),
  express.json({
    type: ["application/json", "text/plain"],
  }),
  routerdel,
  routerAdd,
  routerEdit,
  router,
  routerGet,
];

for (let i = 0; i < allMiddleware.length; i++) {
  app.use(allMiddleware[i]);
}

app.engine("html", require("ejs").renderFile);

//A function that starts a socket server. If it fails to start, the normal http server
(function startServer() {
  try {
    let startSocketServerLet = startSocketServer();
    if (startSocketServerLet == false) {
      startHttpServer();
    }
  } catch (e) {
    console.log(e);
  }
})();

export { app };
