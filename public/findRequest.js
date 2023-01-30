let result;
window.addEventListener("load", () => {
  async function sendData() {
    let findInput = document.querySelector("#httpFindInput");
    let findUserFullNameInput = findInput.value;
    let findUserFullName = {
      dataUser: findUserFullNameInput,
    };

    let response = await fetch("/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(findUserFullName),
    });

    findInput.value = "";
    result = await response.json();
    addUserDataToPage(result);
  }
  const findForm = document.getElementById("httpFindDataForm");
  findForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await sendData();
  });
});

function addUserDataToPage(dataUser) {
  let foundHttpSubtitle = document.querySelector(".subtitleFoundUser");
  if (dataUser != "User no found") {
    // Shows the user found
    foundHttpSubtitle.innerHTML = `${dataUser.name.firstName} ${dataUser.name.lastName}: ${dataUser.number}`;
    document.querySelector(".buttonHttpEdit").classList.remove("hideButton"); // кнопка редагування
    document.querySelector(".buttonHttpDelete").classList.remove("hideButton"); // кнопка видалення

    // Adding to history
    let historyBlock = document.querySelector(".httpList");
    let newAction = document.createElement("li");
    newAction.innerHTML = `User found: ${dataUser.name.firstName} ${dataUser.name.lastName}`;
    historyBlock.append(newAction);
    document.querySelector(".httpLi").remove();
    //
  } else {
    foundHttpSubtitle.innerHTML = "User no found, enter correct name";
    document.querySelector(".buttonHttpEdit").classList.add("hideButton"); // кнопка редагування
    document.querySelector(".buttonHttpDelete").classList.add("hideButton");
  }
}

export { result };
