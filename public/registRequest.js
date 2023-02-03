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
    } else {
      alert("Incorrect validation");
    }
  }
  const addForm = document.getElementById("registFormId");
  addForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await sendData();
  });
});
