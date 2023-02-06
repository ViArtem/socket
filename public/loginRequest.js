window.addEventListener("load", () => {
  async function sendData() {
    let userAuthLogin = document.querySelector("#userAuthLoginId");
    let userAuthPassword = document.querySelector("#userAuthPasswordId");

    let authNewUserData = {
      authUserName: userAuthLogin.value,
      authUserPassword: userAuthPassword.value,
    };

    // Request to auth a user
    let response = await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(authNewUserData),
    });

    let result = await response.json();
    console.log(result.value);

    if (result.value) {
      window.localStorage.setItem("Authorization", result.value);
      window.location.href = "/";
    } else if (result.success == "noUser") {
      alert("Такого користувача не існує, зареєструйтесь");
    } else {
      alert("Incorrect validation");
    }
  }
  const addForm = document.getElementById("authFormId");
  addForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await sendData();
  });
});
