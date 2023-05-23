const socket = io("http://localhost:49160");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

var ntune = new Audio("./assests/tune.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    ntune.play();
  }
};

form.addEventListener("submit", (p) => {
  p.preventDefault();
  const message = messageInput.value;
  append(`you: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter your name");

socket.emit("new-user-joined", name);

socket.on("userjoined", (name) => {
  append(`${name}: joined the chat`, "right");
});
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("leave", (name) => {
  append(`${name} left the chat`, "right");
});
