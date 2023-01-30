//A function that adds a new user
// import { addUserToDatabase } from "../dataBaseFunc/addUsersFunc.js";

import { addUserToDatabase } from "../dataBaseFunc/addGeneral.js";
//Аrray with first and last name
import { splitFullName } from "../otherFunc/string.js";

import { Router } from "express";
const routerAdd = Router();

//Variables that will contain user data
let addFirstName;
let addLastName;
let addNumber;

//Adding a user to the database
routerAdd.post("/add", async (req, res) => {
  try {
    //Phone number validation
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/; ///^[\+][1-9]{1,4}\d{10,11}/
    let numberUser = req.body.AddUserNumber;
    let validateUserNumber = numberUser.match(regularExpretionNumber);

    //Name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    let fullNameBody = req.body.AddUserName;
    console.log("full " + fullNameBody);
    let userFullNameForVerification = splitFullName(fullNameBody)
      .join(" ")
      .match(regularExpretionName);

    //Сhecking if the data is valid, if so the user is added
    if (validateUserNumber != null && userFullNameForVerification != null) {
      //console.log(req.body.userFullName);
      addFirstName = splitFullName(req.body.AddUserName)[0];
      addLastName = splitFullName(req.body.AddUserName)[1];
      addNumber = numberUser;
      if (addLastName == "undefined") {
        res.send(JSON.stringify("Sorry"));
        console.log("Please enter last name");
      } else {
        let newUser = await addUserToDatabase(
          addFirstName,
          addLastName,
          addNumber
        );
        console.log(`New user added: ${newUser}`);

        res.send(newUser);
      }
    } else {
      console.log("Number or name is not valid");
      res.send(JSON.stringify("Sorry"));
    }
  } catch (error) {
    console.log("Wrong number", error);
    res.send(JSON.stringify("Sorry"));
  }
});
export { routerAdd, addFirstName, addLastName, addNumber };
