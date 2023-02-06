window.addEventListener("DOMContentLoaded", () => {
  (async function getUsers() {
    let response = await fetch("/allUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    let result = await response.json();
    renderUser(result);
  })();
});
function renderUser(usersArr) {
  let availHeader = document.querySelector(".nameList");
  for (let i = 0; i < usersArr.length; i++) {
    let newUser = document.createElement("p");
    newUser.classList.add("userSubtitleList");
    newUser.innerHTML = `${usersArr[i].name.firstName} ${usersArr[i].name.lastName}`;
    availHeader.append(newUser);
  }
}

// receive the data of the registered user
window.addEventListener("load", () => {
  (async function getUsers() {
    let response = await fetch("/userValue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    let result = await response.json();

    authUser(result);
  })();
});
function authUser(user) {
  let availHeader = document.querySelector(".users");
  let newUser = document.createElement("p");
  newUser.classList.add("userName");
  newUser.innerHTML = `USER: ${user.username} `;
  availHeader.prepend(newUser);
}

//sign out of the account
document.querySelector(".exit").addEventListener("click", async () => {
  let response = await fetch("/exit", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (await response) {
    return (window.location.href = "/");
  }
});
