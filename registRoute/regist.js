import { Router } from "express";
const routerRegist = Router();
//user search function by login
import { findsRegistUser } from "../dataBaseFunc/registFind.js";

// new user registration
import { registNewUser } from "../dataBaseFunc/registFunc.js";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let bcrypt = require("bcryptjs");

routerRegist.post("/regist", async (req, res) => {
  try {
    // receive data from the form
    const userName = req.body.registUserName.trim();
    const userPassword = req.body.registUserPassword.trim();
    if (userName == "" || userPassword == "") {
      res.json({ success: false });
    } else {
      // check if such a user is registered
      const candidate = await findsRegistUser(userName);

      if (candidate) {
        return res.json({ success: false });
      }
      // hash the password and store the user in the database
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
