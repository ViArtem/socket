import { findsUser } from "../dataBaseFunc/findFunc.js";
import { splitFullName } from "../otherFunc/string.js";

let foundUser;
let userName;
let userLastname;

//Processes a request to find a user

async function findUserByName(userNameForFind) {
  try {
    userName = splitFullName(userNameForFind.fullName)[0];
    userLastname = splitFullName(userNameForFind.fullName)[1];
    // Тhe found user object
    foundUser = await findsUser(userName, userLastname);

    if (foundUser != null) {
      console.log(`user ${foundUser} found`);
      return foundUser;
    } else {
      console.log("No such user exists");
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

export { userName, foundUser, userLastname, findUserByName };
