window.addEventListener("load", () => {
  async function sendData() {
    let userRegistLogin = document.querySelector("#userRegistLoginId");
    let userRegistPassword = document.querySelector("#userRegistPasswordId");

    let registNewUserData = {
      registUserName: userRegistLogin.value,
      registUserPassword: userRegistPassword.value,
    };

    // Request to regist a user
    let response = await fetch("/regist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(registNewUserData),
    });

    let result = await response.json();
    if (result.success) {
      window.location.href = "/auth";
    } else if (!result.password) {
      alert(
        "Password must be at least 6 characters long, must contain at least one special character, one number, and available lowercase and uppercase Latin letters"
      );
    } else alert("Incorrect validation");
  }
  const addForm = document.getElementById("registFormId");
  addForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await sendData();
  });
});

let showPassword = document.querySelector(".checkPassword");
showPassword.addEventListener("click", () => {
  let password = document.querySelector(".userRegistPassword");
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (showPassword.innerHTML == "Show") {
    showPassword.innerHTML = "Hide";
  } else showPassword.innerHTML = "Show";
});
