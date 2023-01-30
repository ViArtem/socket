window.addEventListener("load", () => {
  async function sendData() {
    let response = await fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    let userWhenWasDeleted = await response.json();
    let userWhenWasStatus = await response;
    if (userWhenWasStatus.status == 200) {
      console.log(userWhenWasDeleted);
      await hiddenDeleteData(userWhenWasDeleted);
    }
  }
  const deleteButton = document.querySelector(".buttonHttpDelete");
  deleteButton.addEventListener("click", async () => {
    await sendData();
  });
});

async function hiddenDeleteData(data) {
  // Hides the found user
  let foundHttpSubtitle = document.querySelector(".subtitleFoundUser");
  foundHttpSubtitle.innerHTML = "No user found";
  document.querySelector(".buttonHttpEdit").classList.add("hideButton"); // edit button
  document.querySelector(".buttonHttpDelete").classList.add("hideButton");
  // Removal from the general list
  let allUserForDelete = document.querySelectorAll(".userSubtitleList");
  for (let i = 0; i < allUserForDelete.length; i++) {
    if (allUserForDelete[i].innerHTML == `${data.firstName} ${data.lastName}`) {
      allUserForDelete[i].remove();
      break;
    }
  }

  // Adding to history

  let historyBlock = document.querySelector(".httpList");
  let newAction = document.createElement("li");
  newAction.innerHTML = `User deleted: ${data.firstName} ${data.lastName}`;
  historyBlock.append(newAction);
  document.querySelector(".httpLi").remove();
}
