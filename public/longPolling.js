//does not work

async function subscribe() {
  let response = await fetch("/IfUpdate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status == 502) {
    // Status 502 is a connection timeout error,
    // may happen when the connection was pending for too long,
    // and the remote server or a proxy closed it
    // let's reconnect
    await subscribe();
  } else if (response.status != 200) {
    // An error - let's show it

    //showMessage(response.statusText);
    // Reconnect in one second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Get and show the message
    let message = await response.json();
    console.log(message);

    let historyBlock = document.querySelector(".httpList");
    let newAction = document.createElement("li");
    newAction.innerHTML = `User update: ${message.firstName} ${message.lastName}`;
    historyBlock.append(newAction);
    document.querySelector(".httpLi").remove();

    // Call subscribe() again to get the next message
    await subscribe();
  }
}

subscribe();
