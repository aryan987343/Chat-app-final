// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDuOgy8GKw7rlNvpUjKt00SFAwfBN5PyOw",
    authDomain: "chat-app-b9940.firebaseapp.com",
    databaseURL: "https://chat-app-b9940-default-rtdb.firebaseio.com",
    projectId: "chat-app-b9940",
    storageBucket: "chat-app-b9940.appspot.com",
    messagingSenderId: "81842146418",
    appId: "1:81842146418:web:8520b07b29f28c365f06eb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user");
document.getElementById("#wel").innerHTML = "welcome " + user_name + "!";

function add_room() {
      put = document.getElementById("room_input").value;
      localStorage.setItem("room", put);
      firebase.database().ref("/").child(put).update({
            purpose: "adding room name"
      });
      window.location = "kwitter_page.html"
};

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
      console.log(Room_names);
      row = "<div class='room_name' id='"+Room_names+"' onclick = 'go_to_room(this.id)'>#"+Room_names+"</div> <hr>";
      document.getElementById("output").innerHTML = document.getElementById("output").innerHTML+row;
            });
      });
}
getData();

function go_to_room(name) {
console.log(name);
localStorage.setItem("room", name)
window.location = "chat_page.html"
}

function log_out() {
      localStorage.removeItem("room");
      localStorage.removeItem("user");
      window.location("index.html")
}