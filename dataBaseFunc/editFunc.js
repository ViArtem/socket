import Person from "../models/users.js";
import {
  userIdWeAreUpdating,
  newUserFirstName,
  newUserLastName,
  newUserNum,
} from "../Routes/edit.js";
import { largeFirstLiters } from "../otherFunc/AllLargeLieter.js";
//Сhanges the user in the database
async function editUser() {
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

export { editUser };
