import { Router } from "express";
const routerGet = Router();
import path from "path";

//A function that finds all users available in the database
import { findAllPersonFromeDatabase } from "../dataBaseFunc/findAllPerson.js";

routerGet.get("/", async (req, res) => {
  res.render(path.resolve("index.html"));
});

routerGet.get("/allUser", async (req, res) => {
  let allUser = await findAllPersonFromeDatabase();
  res.send(allUser);
});

export { routerGet };
