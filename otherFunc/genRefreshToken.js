//генерація refresh токена
import dotev from "dotenv";
dotev.config();
const refreshKey = process.env.REFRESH_KEY;
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");

function genRefreshToken(id, username) {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, refreshKey, { expiresIn: "3d" });
}

export { genRefreshToken };
