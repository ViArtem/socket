import { app } from "../server.js";
import { createRequire } from "node:module";
import { socketData } from "../Routes/socketRoute.js";
import { connectToDatabase } from "../connnect.js";
const require = createRequire(import.meta.url);
let server;
let io;
const PORT = process.env.PORT || 3000;
// start the socket server
function startSocketServer() {
  try {
    server = require("http").createServer(app);
    io = require("socket.io")(server);

    server.listen(PORT, async () => {
      connectToDatabase();
      console.log("Started socket...");
    });
    socketData();
  } catch (error) {
    console.log(error);
    return false;
  }
}
export { io, startSocketServer };
