import { io } from "../startServers/socketServ.js";

import { addUserToDatabaseSocket } from "./addSocket.js";

import { largeFirstLiters } from "../otherFunc/AllLargeLieter.js";

import { findUserByName } from "./findSocket.js";

import { splitFullName } from "../otherFunc/string.js";

import { delleteUserFromDatabaseFunction } from "../dataBaseFunc/deleteGeneral.js";

import { updateUser } from "./editSocket.js";

let connections = [];

//handles socket requests
function socketData() {
  io.sockets.on("connection", (socket) => {
    console.log("connected");
    connections.push(socket);

    socket.on("disconnect", () => {
      connections.splice(connections.indexOf(socket), 1);
      console.log("Disconnect");
    });
    // Adding a user
    socket.on("send user value", async (data) => {
      let addStatus = await addUserToDatabaseSocket(data);

      if (addStatus == true) {
        io.sockets.emit("add user", {
          userFullName: largeFirstLiters(data.fullName),
          userNumber: largeFirstLiters(data.number),
        }); // Send information from the server to the client
      } else {
        io.sockets.emit("add user", {
          userFullName: addStatus,
        });
      }
    });

    //User search
    let foundUserId;
    socket.on("find user value", async (data) => {
      console.log("datd:" + JSON.stringify(data));
      let foundData = await findUserByName(data);
      if (foundData == false) {
        io.sockets.emit("find user", {
          userFirstName: JSON.stringify(data),
          found: false,
        });
      } else {
        foundUserId = foundData._id;
        //console.log(foundUserId);
        io.sockets.emit("find user", {
          id: foundData._id,
          userFirstName: foundData.name.firstName,
          userLastName: foundData.name.lastName,
          userNumber: foundData.number,
          found: true,
        });
      }
    });

    // Deleting a user
    socket.on("delete user value", async (data) => {
      console.log("SocketData" + " " + JSON.stringify(data));
      await delleteUserFromDatabaseFunction(
        splitFullName(data.fullName)[0],
        splitFullName(data.fullName)[1]
      );
      io.sockets.emit("delete user", {
        userFirstName: data,
        deleted: true,
      });
    });

    // Editing a user
    socket.on("edit user value", async (data) => {
      console.log("SocketData" + " " + JSON.stringify(data));
      let update = await updateUser(data.newFullName, data.newNumber);
      if (update) {
        io.sockets.emit("edit user", {
          userFirstName: data.newFullName,
          deleted: true,
        });
      } else {
        io.sockets.emit("edit user", {
          userFirstName: "Incorrect data",
          deleted: true,
        });
      }
    });
  });
}
export { socketData };
