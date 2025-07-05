const masterLogin = {
  name: "ayanlove",
  pass: "mysecret"
};

function checkLogin() {
  const name = document.getElementById("masterName").value;
  const pass = document.getElementById("masterPass").value;

  if(name === masterLogin.name && pass === masterLogin.pass){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("nameBox").style.display = "block";
  } else {
    alert("ভুল নাম অথবা পাসওয়ার্ড!");
  }
}

let userName = "";

function enterChat() {
  userName = document.getElementById("userName").value;
  if(userName.length < 1){
    alert("দয়া করে আপনার নাম দিন");
    return;
  }
  document.getElementById("nameBox").style.display = "none";
  document.getElementById("chatBox").style.display = "block";
  document.getElementById("welcome").innerText = `স্বাগতম ${userName}!`;
}

function sendMessage(){
  const msg = document.getElementById("chatInput").value;
  if(msg.trim() === "") return;

  const chatArea = document.getElementById("chatArea");
  const newMsg = document.createElement("div");
  newMsg.innerText = `${userName}: ${msg}`;
  chatArea.appendChild(newMsg);

  document.getElementById("chatInput").value = "";
  chatArea.scrollTop = chatArea.scrollHeight;
}
