import { Router } from "express";
const routerGet = Router();
import path from "path";

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let cookieParser = require("cookie-parser");
// check regist
import { checkRegist } from "../otherFunc/ifRegist.js";

//A function that finds all users available in the database
import { findAllPersonFromeDatabase } from "../dataBaseFunc/findAllPerson.js";

routerGet.get("/", checkRegist, cookieParser(), (req, res) => {
  res.render(path.resolve("view", "index.html"));
});

routerGet.get("/auth", cookieParser(), async (req, res) => {
  res.render(path.resolve("view", "authorization.html"));
});

routerGet.get("/regist", async (req, res) => {
  res.render(path.resolve("view", "registration.html"));
});

routerGet.get("/allUser", async (req, res) => {
  let allUser = await findAllPersonFromeDatabase();
  res.send(allUser);
});

routerGet.get("/userValue", checkRegist, async (req, res) => {
  res.send(req.user);
});

routerGet.get("/exit", checkRegist, async (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
});

export { routerGet };
