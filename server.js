import express from "express";
import { createRequire } from "node:module";
import path from "path";
const require = createRequire(import.meta.url);
//let cookieParser = require("cookie-parser");
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

//authorization
import { routerAuth } from "./registRoute/auth.js";

//regist
import { routerRegist } from "./registRoute/regist.js";

import { userTokens } from "./registRoute/auth.js";

const app = express();

let bodyParser = require("body-parser");

app.set("view engine", "html");

let cookieParser = require("cookie-parser");
/*
const customHeadersAppLevel = function (req, res, next) {
  req.headers["Authorization"] = userTokens;
  next();
};
*/

//app.use(customHeadersAppLevel);
// app.use('/', function (req, res) {
//   let url = config.API_HOST + req.ur
//   req.headers['authorization'] = 'someValue'
//   req.pipe(request(url)).pipe(res)
// })

let allMiddleware = [
  cookieParser(),
  //customHeadersAppLevel, // встановлення кастомних заголовків
  routerGet,
  bodyParser.urlencoded({ extended: true }),
  express.static(path.resolve("public")),
  express.json({
    type: ["application/json", "text/plain"],
  }),

  routerAuth,
  routerRegist,
  routerdel,
  routerAdd,
  routerEdit,
  router,
];

allMiddleware.forEach((elm) => app.use(elm));

app.engine("html", require("ejs").renderFile);

//A function that starts a socket server. If it fails to start, the normal http server

(function startServer() {
  try {
    //let startSocketServerLet = startSocketServer();
    if (!startSocketServer()) {
      console.log(startHttpServer());
    }
  } catch (e) {
    console.log(e);
  }
})();

export { app };
