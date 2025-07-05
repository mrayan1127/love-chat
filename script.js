// ---------------------
// 1. Master Name + Password check
// ---------------------
const masterLogin = {
  name: "ayanlove",
  pass: "mysecret"
};

function checkLogin() {
  const name = document.getElementById("masterName").value;
  const pass = document.getElementById("masterPass").value;

  if (name === masterLogin.name && pass === masterLogin.pass) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("nameBox").style.display = "block";
  } else {
    alert("ভুল নাম অথবা পাসওয়ার্ড!");
  }
}

// ---------------------
// 2. Firebase Config
// ---------------------
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-AUTH-DOMAIN",
  databaseURL: "YOUR-DATABASE-URL",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-STORAGE-BUCKET",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ---------------------
// 3. User enters their name
// ---------------------
let userName = "";

function enterChat() {
  userName = document.getElementById("userName").value;
  if (userName.length < 1) {
    alert("দয়া করে আপনার নাম দিন");
    return;
  }
  document.getElementById("nameBox").style.display = "none";
  document.getElementById("chatBox").style.display = "block";
  document.getElementById("welcome").innerText = `স্বাগতম ${userName}!`;
}

// ---------------------
// 4. Sending message to Firebase
// ---------------------
function sendMessage() {
  const msg = document.getElementById("chatInput").value;
  if (msg.trim() === "") return;

  db.ref("messages").push({
    name: userName,
    text: msg
  });

  document.getElementById("chatInput").value = "";
}

// ---------------------
// 5. Receiving message from Firebase
// ---------------------
db.ref("messages").on("child_added", function(snapshot) {
  const msg = snapshot.val();
  const chatArea = document.getElementById("chatArea");
  const newMsg = document.createElement("div");
  newMsg.innerText = `${msg.name}: ${msg.text}`;
  chatArea.appendChild(newMsg);
  chatArea.scrollTop = chatArea.scrollHeight;
});
