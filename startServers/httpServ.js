import { app } from "../server.js";
import { connectToDatabase } from "../connnect.js";
// start the http server
const PORT = process.env.PORT || 3000;
function startHttpServer() {
  app.listen(PORT, () => {
    connectToDatabase();
    //console.log("Start...");
  });
  return "Start...";
}

export { startHttpServer };
