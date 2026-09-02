import showMessage from "./messageBox.js";

showMessage("it works!");


const msgInput = document.querySelector("#msg");
const buttonArrayInput = document.querySelector("#buttonArray");
const callbackInput = document.querySelector("#callback");
document.querySelector("#showMessage").addEventListener("submit", (e) => {
  e.preventDefault();

  let callback = null;
  if (callbackInput.checked) {
    callback = (result) => {
      showMessage(`${msgInput.value} ${result}`);
    };
  }
showMessage(msgInput.value, buttonArrayInput.value.split(","), callback);
});
