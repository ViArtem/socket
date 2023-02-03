import { valueFindInput, idUserForEditing } from "./foundInfo.js";

let socket = io.connect();

let foundUserFromDatabaseData;
let idFoundUserFromDatabaseData;
let userFullNameValue;
let userNumberValue;

//Form with adding a user
let $inputSocketNumber = document.querySelector("#socketAddNumberInput");
let $inputSocketFullNameAdd = document.querySelector("#socketAddNameInput");
let $addForm = document.querySelector(".addSocketForm");
$addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("send user value", {
    fullName: $inputSocketFullNameAdd.value,
    number: $inputSocketNumber.value,
  });
  $inputSocketFullNameAdd.value = "";
  $inputSocketNumber.value = "";
});

//User finder form
let $findForm = document.querySelector(".socketFindForm");
let $inputFullNameFind = document.querySelector("#socketFindInput");

$findForm.addEventListener("submit", (event) => {
  event.preventDefault();

  socket.emit("find user value", {
    fullName: valueFindInput,
  });
  $inputFullNameFind.value = "";
});

//Button with delete user
let $deleteButton = document.querySelector(".formSocketDelete");
$deleteButton.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("delete user value", {
    fullName: valueFindInput, //foundUserFromDatabaseData,
  });
});

let $updateFullNameInput = document.querySelector("#socketEditFullNameInput");
let $updateNumberInput = document.querySelector("#socketEditNumberInput");

//  User edit form
let $editForm = document.querySelector("#editUserSocketForm");
$editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  socket.emit("edit user value", {
    newFullName: $updateFullNameInput.value,
    newNumber: $updateNumberInput.value,
    idForUpdate: idUserForEditing,
  });
  $updateFullNameInput.value = "";
  $updateNumberInput.value = "";
});

//Block with user editing
let $allUserListBlock = document.querySelector(".nameList");
let $enptyLi = document.querySelector(".socketLi");
let $allMessage = document.querySelector(".socketList");
socket.on("edit user", (data) => {
  if (data.userFirstName == "Incorrect data") {
    console.log("Incorrect data");
  } else {
    // add to history
    let newhr = document.createElement("li");
    newhr.innerHTML = `user ${JSON.stringify(
      data.userFirstName
    )} has been edited`;
    $allMessage.append(newhr);
    $enptyLi.remove();

    // add to general list
    let newUserList = document.createElement("p");
    newUserList.classList.add("userSubtitleList");
    newUserList.innerHTML = `${data.userFirstName}`;
    $allUserListBlock.append(newUserList);
    // deleting the old value
    let allUserForEdit = document.querySelectorAll(".userSubtitleList");
    //console.log(userFullNameValue);
    for (let i = 0; i < allUserForEdit.length; i++) {
      if (`${allUserForEdit[i].innerHTML}` == `${valueFindInput}`) {
        allUserForEdit[i].remove();
        break;
      }
    }
  }
});

// Block with user addition

socket.on("add user", async (data) => {
  if (data.userFullName == false) {
    alert("Validation error");
  } else {
    // List of operations
    let newUser = document.createElement("li");
    newUser.innerHTML = `User ${data.userFullName} has been added to the database`;
    $allMessage.append(newUser);
    $enptyLi.remove();

    // a list of users available in the database
    let newUserList = document.createElement("p");
    newUserList.classList.add("userSubtitleList");
    newUserList.innerHTML = `${data.userFullName}`;
    $allUserListBlock.append(newUserList);
  }
});

//User finder block
//let userId
socket.on("find user", (data) => {
  let newFound = document.createElement("li");
  if (data.found) {
    userFullNameValue = `${data.userFirstName} ${data.userLastName}`;
    userNumberValue = `${data.userNumber}`;
    //userId = `${data.id}`;
    newFound.innerHTML = `A search request for the user ${data.userFirstName} ${data.userLastName} has been sent`;
    $allMessage.append(newFound);
    foundUserFromDatabaseData = `${data.userFirstName} ${data.userLastName} : ${data.userNumber}`;
    idFoundUserFromDatabaseData = data.id;
    $enptyLi.remove();
  } else {
    foundUserFromDatabaseData = "";
    newFound.innerHTML = `User ${data.userFirstName}  not found`;
    $allMessage.append(newFound);
    $enptyLi.remove();
  }
});

//

//Block with user deletion
socket.on("delete user", (data) => {
  let newhr = document.createElement("li");
  newhr.innerHTML = `user ${JSON.stringify(
    data.userFirstName.fullName
  )} has been deleted`;
  $allMessage.append(newhr);
  $enptyLi.remove();
  // removal from the general list
  function splitFullName(fullname) {
    let fulln = fullname.split(" ").filter((w) => w != "");
    return fulln;
  }

  let allUserForDelete = document.querySelectorAll(".userSubtitleList");

  for (let i = 0; i < allUserForDelete.length; i++) {
    if (
      allUserForDelete[i].innerHTML ==
      `${splitFullName(data.userFirstName.fullName)[0]} ${
        splitFullName(data.userFirstName.fullName)[1]
      }`
    ) {
      allUserForDelete[i].remove();
      break;
    }
  }
  //
});

export {
  foundUserFromDatabaseData,
  idFoundUserFromDatabaseData,
  userFullNameValue,
  userNumberValue,
};
