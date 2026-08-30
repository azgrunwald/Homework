let count = 1;
document.querySelector("body").addEventListener("click", (e) => {
  if (e.target === document.body) {
    return;
  }
  const myNewButton = document.createElement("button");
  myNewButton.textContent = ++count;
  document.body.appendChild(myNewButton);
});
