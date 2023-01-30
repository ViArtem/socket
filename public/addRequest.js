window.addEventListener("load", () => {
  async function sendData() {
    let userHttpFullname = document.querySelector("#httpAddFullNameInput");
    let userHttpNumber = document.querySelector("#httpAddNumberInput");

    let addNewUserData = {
      AddUserName: userHttpFullname.value,
      AddUserNumber: userHttpNumber.value,
    };

    // Request to add a user
    let response = await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(addNewUserData),
    });

    let result = await response.json();

    // If a user is added, his data is transferred to the general list
    if (result != "Sorry") {
      let availHeader = document.querySelector(".nameList");
      let newUser = document.createElement("p");
      newUser.classList.add("userSubtitleList");
      newUser.innerHTML = `${result.name.firstName} ${result.name.lastName}`;
      availHeader.append(newUser);
      userHttpFullname.value = "";
      userHttpNumber.value = "";

      // Adding to history
      let historyBlock = document.querySelector(".httpList");
      let newAction = document.createElement("li");
      newAction.innerHTML = `Added a new user: ${result.name.firstName} ${result.name.lastName}`;
      historyBlock.append(newAction);
      document.querySelector(".httpLi").remove();
    } else {
      alert("Incorrect data");
    }
    //
  }
  const addForm = document.getElementById("addUserHttpForm");
  addForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await sendData();
  });
});
