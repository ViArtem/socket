import Regist from "../models/Registered.js";

async function registNewUser(login, password) {
  try {
    const registNewUser = await new Regist({
      userName: login,
      password,
    });
    await registNewUser.save();
    return registNewUser;
  } catch (e) {
    console.log(e);
  }
}

export { registNewUser };
