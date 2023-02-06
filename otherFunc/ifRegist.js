import { createRequire } from "node:module";
import { validateRefreshToken } from "./validRefresh.js";
import { findsRegistUser } from "../dataBaseFunc/registFind.js";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");

const key = process.env.KEY;

let decodedData;
async function checkRegist(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    // if there are no cookies, we transfer to authorization
    if (req.headers.cookie == undefined) {
      return res.redirect("/auth");
    }
    // if there are cookies, we first get the access token
    const token = req.headers.cookie.split("=")[1];
    console.log("TOKEN " + token);
    //verify the token
    decodedData = jwt.verify(token, key);
    // checking if the user with the name extracted from the token is in the database
    if (!(await findsRegistUser(decodedData.username))) {
      res.clearCookie("token");
      return res.redirect("/auth");
    }

    req.user = decodedData;
    next();
  } catch (e) {
    //
    console.log(e);
    console.log(req.headers);

    if (e instanceof jwt.TokenExpiredError) {
      console.log(
        "Хедер при закінченні аксес токена" + JSON.stringify(req.headers)
      );
      // look for a user by id, look at his refresh, validate him, if he is valid, issue a new access
      let newToken = await validateRefreshToken(
        req.headers.cookie.split("=")[1]
      );
      if (newToken.message === "Opss...") {
        return res.redirect("/auth");
      }

      console.log("NEWTOKEN " + newToken);
      res.clearCookie("token");
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 259200000,
      });
      return res.redirect("/");
    }
    res.redirect("/auth");
    next();
  }
}

export { checkRegist, decodedData };
