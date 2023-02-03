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
        //Authorization: "",
      },
      body: JSON.stringify(authNewUserData),
    });

    let result = await response.json();
    console.log(result.value);
    if (result.value) {
      window.localStorage.setItem("Authorization", `Bearer ${result.value}`);
      authToken = `Bearer ${result.value}`;

      //console.log(localStorage.getItem("Authorization"));
      // let headers = new Headers();
      // headers.append("Authorization", "Bearer " + result.token);
      // let respons = await fetch("/", {
      //   method: "GET",
      //   headers: {
      //     Authorization: window.localStorage.getItem("Authorization"),
      //   },
      // });

      window.location.href = "/";
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
