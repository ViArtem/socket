import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");
import path from "path";
import { key } from "../key.js";
function checkRegist(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    //console.log(JSON.stringify(req.headers.authorization));
    if (JSON.stringify(req.headers.Authorization) == undefined) {
      return res.redirect("/auth");
    }
    console.log("yesss");
    console.log(req.headers.Authorization);
    const token = req.headers.Authorization.split(" ")[1];
    console.log("TOKEN " + token);
    const decodedData = jwt.verify(token, key);

    console.log("DATA " + JSON.stringify(decodedData));

    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.redirect("/auth");
    }
    console.log(e);
    res.redirect("/regist");
    //вивести повідомлення що користувач не авторизований
  }
}

export { checkRegist };
