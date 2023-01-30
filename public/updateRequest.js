import { result } from "./findRequest.js";
window.addEventListener("load", () => {
  function hiddenEditBlock() {
    let allCard = document.querySelectorAll(".buttonHidenForEdit");
    for (let i = 0; i < allCard.length; i++) {
      allCard[i].classList.remove("hidenEditBlock");
    }
    document.querySelector(".editBlock").classList.add("hidenEditBlock");

    document.querySelector(".subtitleFoundUser").innerHTML = "No user found";
    document.querySelector(".buttonHttpEdit").classList.add("hideButton");
    document.querySelector(".buttonHttpDelete").classList.add("hideButton");
  }

  //Reading data from a field to update
  let userHttpFullname = document.querySelector("#httpEditFullNameInput");
  let userHttpNumber = document.querySelector("#httpEditNumberInput");
  async function sendData() {
    let editNewUserData = {
      newUserName: userHttpFullname.value,
      newUserNumber: userHttpNumber.value,
    };
    //

    //Update request
    let response = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(editNewUserData),
    });
    //

    let resultUpdate = await response.json();

    //
    if (resultUpdate != "Sorry") {
      //
      hiddenEditBlock();
      userHttpFullname.value = "";
      userHttpNumber.value = "";
      //
      let allUserForEdit = document.querySelectorAll(".userSubtitleList");

      for (let i = 0; i < allUserForEdit.length; i++) {
        if (
          allUserForEdit[i].innerHTML ==
          `${result.name.firstName} ${result.name.lastName}`
        ) {
          allUserForEdit[
            i
          ].innerHTML = `${resultUpdate.firstName} ${resultUpdate.lastName}`;
          break;
        }
      }

      // Adding to history
      let historyBlock = document.querySelector(".httpList");
      let newAction = document.createElement("li");
      newAction.innerHTML = `User update: ${resultUpdate.firstName} ${resultUpdate.lastName}`;
      historyBlock.append(newAction);
      document.querySelector(".httpLi").remove();
    } else {
      alert("Incorrect data");
    }
    //
  }

  //Fires when new data is sent
  const addForm = document.getElementById("editUserHttpForm");
  addForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await sendData();
  });
  //

  // Triggered when the update button is pressed
  const updateButton = document.querySelector(".buttonHttpEdit");
  updateButton.addEventListener("click", () => {
    document.querySelector(".editBlock").classList.remove("hidenEditBlock");

    //Filling in input fields
    userHttpFullname.value = `${result.name.firstName} ${result.name.lastName}`;
    userHttpNumber.value = `${result.number}`;
    //

    //Hiding all blocks except editing
    let allCard = document.querySelectorAll(".buttonHidenForEdit");
    for (let i = 0; i < allCard.length; i++) {
      allCard[i].classList.add("hidenEditBlock");
    }
    //

    // Cancel button
    let cancelEdit = document.querySelector(".cancelEditButton");
    cancelEdit.addEventListener("click", hiddenEditBlock);
  });
});
