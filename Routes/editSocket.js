import { foundUser } from "../Routes/findSocket.js";
import { editUserSocket } from "../dataBaseFunc/editFuncSocket.js";
import { splitFullName } from "../otherFunc/string.js";

let userIdWeAreUpdating;
let newUserFirstName;
let newUserLastName;
let newUserNum;

async function updateUser(name, number) {
  try {
    console.log(`Наші дані ${name} ${number}`);
    //New number validation
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/; ///^[\+][1-9]{1,4}\d{10,11}/
    let numberUser = number;
    let validateNewUserNumber = numberUser.match(regularExpretionNumber);

    //New name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    let userFullNameForVerification = splitFullName(name)
      .join(" ")
      .match(regularExpretionName);
    if (validateNewUserNumber != null && userFullNameForVerification != null) {
      newUserFirstName = splitFullName(name)[0];
      newUserLastName = splitFullName(name)[1];
      newUserNum = number;
      userIdWeAreUpdating = foundUser.id;
      if (newUserLastName == "undefined") {
        console.log("Enter fullname");
        return false;
      } else {
        let userUpdateData = await editUserSocket(
          newUserFirstName,
          newUserLastName,
          userIdWeAreUpdating,
          newUserNum
        );
        console.log("The user is updated");
        return true;
      }
    } else {
      console.log("Incorrect data");
      return false;
    }
  } catch (error) {
    console.log(`Updating error: ${error}`);
    return false;
  }
}

export {
  userIdWeAreUpdating,
  newUserFirstName,
  newUserLastName,
  newUserNum,
  updateUser,
};
