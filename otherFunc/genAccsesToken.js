//генерація аксес токена
import { key } from "../key.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");
function genAccsessToken(id, username) {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, key, { expiresIn: "40s" });
}

export { genAccsessToken };
