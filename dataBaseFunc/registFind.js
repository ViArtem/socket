import Regist from "../models/Registered.js";

async function findsRegistUser(login) {
  try {
    let findUser = await Regist.findOne({
      userName: login,
    });

    return findUser;
  } catch (e) {
    console.log("Opss ..." + e);
    return e;
  }
}

export { findsRegistUser };
