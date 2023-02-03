import Person from "../models/users.js";

import { largeFirstLiters } from "../otherFunc/AllLargeLieter.js";

//let ins = await import("../public/foundInfo.js");
//Сhanges the user in the database
async function editUserSocket(
  newUserFirstName,
  newUserLastName,
  userIdWeAreUpdating,
  newUserNum
) {
  try {
    let newUpdatedUser = await Person.updateOne(
      { _id: userIdWeAreUpdating },
      {
        $set: {
          name: {
            firstName: largeFirstLiters(newUserFirstName),
            lastName: largeFirstLiters(newUserLastName),
          },
        },
        number: newUserNum,
      }
    );

    return {
      firstName: largeFirstLiters(newUserFirstName),
      lastName: largeFirstLiters(newUserLastName),
      _id: userIdWeAreUpdating,
    };
  } catch (e) {
    console.log(e);
  }
}

export { editUserSocket };
