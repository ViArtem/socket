import { Router } from "express";
const routerdel = Router();
import { delleteUserFromDatabaseFunction } from "../dataBaseFunc/deleteFunc.js";

let booleanDeleteUser = true;
//Handles a request to delete a user
routerdel.post("/delete", async (req, res) => {
  try {
    let deletedUser = await delleteUserFromDatabaseFunction();
    console.log(`User ${JSON.stringify(deletedUser)} was deleted`);
    res.send(JSON.stringify(deletedUser));
  } catch (error) {
    console.log(error);
    res.sendStatus(error.status);
  }
});
export { routerdel, booleanDeleteUser };
