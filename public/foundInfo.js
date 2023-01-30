import { userFullNameValue, userNumberValue } from "./socketRequest.js";
let valueFindInput;
// Display of the found user
let $findSocketButton = document.querySelector(".userFindSocketButton");
$findSocketButton.addEventListener("click", addUserDataToPage);

function addUserDataToPage() {
  let $inputFullNameFind = document.querySelector("#socketFindInput").value;
  valueFindInput = $inputFullNameFind;

  setTimeout(async () => {
    let foundUser = await import("./socketRequest.js");
    let foundSocketSubtitle = document.querySelector(
      ".socketSubtitleFoundUser"
    );

    if (foundUser.foundUserFromDatabaseData != "") {
      foundSocketSubtitle.innerHTML = foundUser.foundUserFromDatabaseData;
      document
        .querySelector(".buttonSocketEdit")
        .classList.remove("hideButton"); // edit button
      document
        .querySelector(".buttonSocketDelete")
        .classList.remove("hideButton"); // delete button
    } else {
      foundSocketSubtitle.innerHTML = "User no found, enter correct name";
      document.querySelector(".buttonSocketEdit").classList.add("hideButton"); // edit button
      document.querySelector(".buttonSocketDelete").classList.add("hideButton");
    }
  }, 250);
}

// Delete the user
let $deleteSocketButton = document.querySelector(".buttonSocketDelete");
$deleteSocketButton.addEventListener("click", hideButton);

function hideButton() {
  setTimeout(() => {
    let foundSocketSubtitle = document.querySelector(
      ".socketSubtitleFoundUser"
    );
    foundSocketSubtitle.innerHTML = "No user found";
    document.querySelector(".buttonSocketEdit").classList.add("hideButton"); // кнопка редагування
    document.querySelector(".buttonSocketDelete").classList.add("hideButton");
  }, 250);
}

// User editing
let $updateSocketButton = document.querySelector(".buttonSocketEdit");
$updateSocketButton.addEventListener("click", () => {
  document.querySelector(".editSocketBlock").classList.remove("hidenEditBlock");

  //Filling in input fields socketEditFullNameInput
  document.querySelector("#socketEditFullNameInput").value = userFullNameValue;
  document.querySelector("#socketEditNumberInput").value = userNumberValue;
  //

  //Hiding all blocks except editing
  let allCard = document.querySelectorAll(".buttonHidenForEdit");
  for (let i = 0; i < allCard.length; i++) {
    allCard[i].classList.add("hidenEditBlock");
  }
  //

  // Cancel button
  let cancelEdit = document.querySelector(".cancelSocketEditButton");
  cancelEdit.addEventListener("click", hiddenEditBlock);

  // Ok button
  let okEdit = document.querySelector(".okSocketEditButton");
  okEdit.addEventListener("click", hiddenEditBlock);
});

function hiddenEditBlock() {
  setTimeout(() => {
    let allCard = document.querySelectorAll(".buttonHidenForEdit");
    for (let i = 0; i < allCard.length; i++) {
      allCard[i].classList.remove("hidenEditBlock");
    }
    document.querySelector(".editSocketBlock").classList.add("hidenEditBlock");

    document.querySelector(".socketSubtitleFoundUser").innerHTML =
      "No user found";
    document.querySelector(".buttonSocketEdit").classList.add("hideButton");
    document.querySelector(".buttonSocketDelete").classList.add("hideButton");
  }, 100);
}

export { valueFindInput };
