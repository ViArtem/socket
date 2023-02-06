import Regist from "../models/Registered.js";

async function addRefreshTokenToDatabase(userId, refresh) {
  try {
    let UpdatedRefresh = await Regist.updateOne(
      { _id: userId },
      {
        $set: {
          refresh,
        },
      }
    );

    return UpdatedRefresh;
  } catch (e) {
    console.log(e);
  }
}

export { addRefreshTokenToDatabase };
