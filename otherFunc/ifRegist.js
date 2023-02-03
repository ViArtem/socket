import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");

const key = process.env.KEY;
function checkRegist(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    //console.log(req.cookie);
    if (req.headers.cookie == undefined) {
      console.log(req.headers);
      return res.redirect("/auth");
    }

    console.log("yesss");
    console.log(req.headers);
    const token = req.headers.cookie.split("=")[1];
    console.log("TOKEN " + token);
    const decodedData = jwt.verify(token, key);

    console.log("DATA " + JSON.stringify(decodedData));
    req.user = decodedData;
    next();
    // if (JSON.stringify(req.headers.Authorization) == undefined) {
    //   return res.redirect("/auth");
    // }
    // console.log("yesss");
    // console.log(req.headers.Authorization);
    // const token = req.headers.Authorization.split(" ")[1];
    // console.log("TOKEN " + token);
    // const decodedData = jwt.verify(token, key);

    // console.log("DATA " + JSON.stringify(decodedData));

    // next();
  } catch (e) {
    //
    if (e instanceof jwt.TokenExpiredError) {
      res.clearCookie("token");
    }
    console.log(e);
    res.redirect("/regist");
    //вивести повідомлення що користувач не авторизований
  }
}

export { checkRegist };
