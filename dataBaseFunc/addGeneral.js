import Person from "../models/users.js";
import { largeFirstLiters } from "../otherFunc/AllLargeLieter.js";
//Аdds a user to the database
async function addUserToDatabase(firstName, lastName, number) {
  try {
    const newUser = await new Person({
      name: {
        firstName: largeFirstLiters(firstName),
        lastName: largeFirstLiters(lastName),
      },
      number,
    });
    await newUser.save();
    return newUser;
  } catch (e) {
    console.log(e);
  }
}

export { addUserToDatabase };
