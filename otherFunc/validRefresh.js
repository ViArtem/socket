import Regist from "../models/Registered.js";

import jwt_decode from "jwt-decode";

import { genAccsessToken } from "./genAccsesToken.js";

import { createRequire } from "node:module";
const refreshKey = process.env.REFRESH_KEY;

const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");
let validPerson;

async function validateRefreshToken(TokeNdecodedData) {
  try {
    if (TokeNdecodedData) {
      let decoded = jwt_decode(TokeNdecodedData);

      validPerson = await Regist.findOne({ _id: decoded.id });

      if (!validPerson) {
        return new Error("Opss...");
      }

      let verifyRefresh = jwt.verify(validPerson.refresh, refreshKey);

      let userToken = genAccsessToken(validPerson.id, validPerson.userName);

      return userToken;
    } else return new Error("Opss...");
  } catch (e) {
    // if there is a token error, we transfer user to authorization
    if (e instanceof jwt.TokenExpiredError) {
      console.log("Щось з рефреш");
      console.log("VAlid person " + validPerson._id);
      await Regist.updateOne(
        { _id: validPerson._id },
        {
          $set: {
            refresh: "I registered",
          },
        }
      );
      console.log("Помилка в функції " + e);
      return new Error("Opss...");
    }

    return new Error("Opss...");
  }
}

export { validateRefreshToken };
