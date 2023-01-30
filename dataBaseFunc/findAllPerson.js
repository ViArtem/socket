import Person from "../models/users.js";
//A function that finds all users available in the database
async function findAllPersonFromeDatabase() {
  return await Person.find({}).lean();
}

export { findAllPersonFromeDatabase };
