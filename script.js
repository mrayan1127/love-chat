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
  apiKey: "AIzaSyC5BNkVPRtmQLu4cdGLbWu9UstQf1JHzTY",
  authDomain: "love-chat-app-e4952.firebaseapp.com",
  projectId: "love-chat-app-e4952",
  storageBucket: "love-chat-app-e4952.appspot.com",
  messagingSenderId: "691245226575",
  appId: "1:691245226575:web:4cb8913a956ffe96b2a83a",
  measurementId: "G-2MMPPN0757"
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
