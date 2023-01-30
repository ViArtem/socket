import { Router } from "express";
const router = Router();
import { findsUser } from "../dataBaseFunc/findFunc.js";
import { splitFullName } from "../otherFunc/string.js";

let foundUser;
let userName;
let userLastname;

//Processes a request to find a user
router.post("/find", async (req, res) => {
  try {
    userName = splitFullName(req.body.dataUser)[0];
    userLastname = splitFullName(req.body.dataUser)[1];
    // Тhe found user object
    foundUser = await findsUser(userName, userLastname);

    if (foundUser != null) {
      console.log(`user ${foundUser} found`);
      res.send(foundUser);
    } else res.send(JSON.stringify("User no found"));
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify("Error"));
  }
});

export { router, userName, foundUser, userLastname };
