import { Router } from "express";
const routerRegist = Router();
//функція пошуку користувача за логіном
import { findsRegistUser } from "../dataBaseFunc/registFind.js";

// реєстрація нового користувача
import { registNewUser } from "../dataBaseFunc/registFunc.js";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let bcrypt = require("bcryptjs");

routerRegist.post("/regist", async (req, res) => {
  try {
    // отримуєм дані з форми
    const userName = req.body.registUserName;
    const userPassword = req.body.registUserPassword;
    if (userName.trim() == "" || userPassword.trim() == "") {
      res.json({ success: false });
    } else {
      // перевірям зареєстровано такого користувача
      const candidate = await findsRegistUser(userName);
      // console.log("cand" + candidate);

      if (candidate) {
        return res.json({ success: false });
      }
      // хешуєм пароль та зберігаєм користувача в базі даних
      let hashPassword = bcrypt.hashSync(userPassword, 7);
      let newUser = await registNewUser(userName, hashPassword);
      //
      console.log(newUser);
      res.json({ success: true });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Registration error" });
  }
});
export { routerRegist };
