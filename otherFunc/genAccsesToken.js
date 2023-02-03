//генерація аксес токена
import dotev from "dotenv";
dotev.config();
const key = process.env.KEY;
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");
function genAccsessToken(id, username) {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, key, { expiresIn: "100s" });
}

export { genAccsessToken };
