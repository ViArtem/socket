//A function that adds a new user
import { addUserToDatabase } from "../dataBaseFunc/addGeneral.js";

//Аrray with first and last name
import { splitFullName } from "../otherFunc/string.js";

//Variables that will contain user data
//Adding a user to the database

async function addUserToDatabaseSocket(userData) {
  try {
    //Phone number validation
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/; ///^[\+][1-9]{1,4}\d{10,11}/
    let numberUser = userData.number;
    let validateUserNumber = numberUser.match(regularExpretionNumber);

    //Name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    let fullNameBody = userData.fullName;
    console.log("full " + fullNameBody);
    let userFullNameForVerification = splitFullName(fullNameBody)
      .join(" ")
      .match(regularExpretionName);

    //Сhecking if the data is valid, if so the user is added
    if (validateUserNumber != null && userFullNameForVerification != null) {
      let addSocketFirstName = splitFullName(fullNameBody)[0];
      let addSocketLastName = splitFullName(fullNameBody)[1];

      if (addSocketLastName == "undefined") {
        console.log("Undefined");
        return false;
      } else {
        let newUser = await addUserToDatabase(
          addSocketFirstName,
          addSocketLastName,
          numberUser
        );
        console.log(`New user added: ${newUser}`);

        return true;
      }
    } else {
      console.log("Number or name is not valid");
      return false;
    }
  } catch (error) {
    console.log("Wrong number", error);
  }
}

export { addUserToDatabaseSocket };
