import { Router } from "express";
const routerAuth = Router();

import { findsRegistUser } from "../dataBaseFunc/registFind.js";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let bcrypt = require("bcryptjs");

//генерація аксес токена
import { genAccsessToken } from "../otherFunc/genAccsesToken.js";

let userToken = undefined;
let userTokens = undefined;

routerAuth.post("/auth", async (req, res) => {
  try {
    const userNameAuth = req.body.authUserName;
    const userPasswordAuth = req.body.authUserPassword;
    let userAuth = await findsRegistUser(userNameAuth);
    if (!userAuth) {
      res.json({ success: false });
    } else {
      //порівнюєм паролі
      const validPerson = bcrypt.compareSync(
        userPasswordAuth,
        userAuth.password
      );

      if (!validPerson) {
        return res.json({ success: false });
      }
      //генерація Accsess токена
      userToken = genAccsessToken(userAuth._id, userAuth.userName);

      userTokens = `Bearer ${userToken}`;
      //  res.setHeader("Authorization", userToken);
      res.send({ value: userToken });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Registration error" });
  }
});

export { routerAuth, userToken, userTokens };
