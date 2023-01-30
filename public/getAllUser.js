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
    console.log(result);
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
