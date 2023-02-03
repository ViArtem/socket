import { Router } from "express";
const routerGet = Router();
import path from "path";

import { userToken } from "../registRoute/auth.js";

// check regist
import { checkRegist } from "../otherFunc/ifRegist.js";

//A function that finds all users available in the database
import { findAllPersonFromeDatabase } from "../dataBaseFunc/findAllPerson.js";

routerGet.get("/", checkRegist, (req, res) => {
  console.log(req.headers);
  res.render(path.resolve("view", "index.html"));
});

routerGet.get("/auth", async (req, res) => {
  res.render(path.resolve("view", "authorization.html"));
});

routerGet.get("/regist", async (req, res) => {
  res.render(path.resolve("view", "registration.html"));
});

routerGet.get("/allUser", async (req, res) => {
  let allUser = await findAllPersonFromeDatabase();
  res.send(allUser);
});

export { routerGet };
