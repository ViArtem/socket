import Person from "../models/users.js";
import { userName, userLastname } from "../Routes/findSocket.js";

//Deletes the user from the database
async function delleteUserFromDatabaseFunction(userName, userLastname) {
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
