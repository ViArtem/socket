import Person from "../models/users.js";
import { userName, userLastname } from "../Routes/find.js";

//Deletes the user from the database
async function delleteUserFromDatabaseFunction() {
  try {
    await Person.deleteOne({
      name: { firstName: userName, lastName: userLastname },
    });
    return { firstName: userName, lastName: userLastname };
  } catch (error) {
    console.log(error);
  }
}

export { delleteUserFromDatabaseFunction };
