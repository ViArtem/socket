import { Router } from "express";
const routerAuth = Router();

import { findsRegistUser } from "../dataBaseFunc/registFind.js";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let bcrypt = require("bcryptjs");

//access function
import { genAccsessToken } from "../otherFunc/genAccsesToken.js";

// refresh function
import { genRefreshToken } from "../otherFunc/genRefreshToken.js";

import { addRefreshTokenToDatabase } from "../dataBaseFunc/addRefToDatabase.js";

let userToken = undefined;
let userTokens = undefined;

routerAuth.post("/auth", async (req, res) => {
  try {
    const userNameAuth = req.body.authUserName.trim();
    const userPasswordAuth = req.body.authUserPassword.trim();
    let userAuth = await findsRegistUser(userNameAuth.trim());
    if (!userAuth) {
      res.json({ success: "noUser" });
    } else {
      //compare passwords
      const validPerson = bcrypt.compareSync(
        userPasswordAuth.trim(),
        userAuth.password
      );

      if (!validPerson) {
        return res.json({ success: false });
      }
      // generation of access token
      userToken = genAccsessToken(userAuth._id, userAuth.userName);
      // generation of Refresh token
      let userRefreshToken = genRefreshToken(userAuth._id, userAuth.userName);
      if (userAuth.refresh == "I registered") {
        await addRefreshTokenToDatabase(userAuth._id, userRefreshToken);
      }

      console.log("REFRESH " + userRefreshToken);

      console.log(userToken);
      // res.setHeader("Authorization", `Bearer ${userToken}`);
      res.cookie("token", userToken, {
        httpOnly: true,
        maxAge: 259200000,
      });
      //res.header("Authorization", userToken);
      return res.send({ value: userToken });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Registration error" });
  }
});

export { routerAuth, userToken, userTokens };
