import { Router } from "express";
import { foundUser } from "./find.js";
import { createRequire } from "node:module";
import { editUser } from "../dataBaseFunc/editFunc.js";
import { splitFullName } from "../otherFunc/string.js";

const require = createRequire(import.meta.url);
const path = require("path");
const routerEdit = Router();

let userIdWeAreUpdating;
let newUserFirstName;
let newUserLastName;
let newUserNum;

let ifUpdate;
let updateUser;

// Handles a user update request
routerEdit.post("/update", async (req, res) => {
  try {
    //New phone number validation
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/; ///^[\+][1-9]{1,4}\d{10,11}/
    let numberUser = req.body.newUserNumber;
    let validateNewUserNumber = numberUser.match(regularExpretionNumber);

    //New name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    let userFullNameForVerification = splitFullName(req.body.newUserName)
      .join(" ")
      .match(regularExpretionName);

    if (validateNewUserNumber != null && userFullNameForVerification != null) {
      newUserFirstName = splitFullName(req.body.newUserName)[0];
      newUserLastName = splitFullName(req.body.newUserName)[1];
      newUserNum = numberUser;

      if (newUserLastName == "undefined") {
        console.log("Enter fullname");
        res.send(JSON.stringify("Sorry"));
      } else {
        userIdWeAreUpdating = foundUser.id;
        updateUser = await editUser();
        ifUpdate = true;
        console.log("The user is updated");
        res.send(updateUser);
      }
    } else {
      console.log("Number or name is not valid");
      res.send(JSON.stringify("Sorry"));
    }
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify("Sorry"));
  }
});

//does not work
routerEdit.post("/IfUpdate", async (req, res) => {
  if (ifUpdate) {
    res.send(updateUser);
  }
});

export {
  routerEdit,
  userIdWeAreUpdating,
  newUserFirstName,
  newUserLastName,
  newUserNum,
};
