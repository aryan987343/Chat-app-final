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

user = localStorage.getItem("user");
room = localStorage.getItem("room")

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room).push({
            name: user,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);

                        name1 = message_data["name"];
                        like = message_data["like"];
                        message = message_data["message"];

                        name_with_tag = "<h4>" + name1 + "<img class='user_tick' src='tick.png'></h4>";
                        message_tag = "<h5 class='message_h4'>" + message + "</h5>";
                        button_tag = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + "onclick='update_like(this.id)'>";
                        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";
                        row = name_with_tag + message_tag + button_tag + span_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function log_out() {
      localStorage.removeItem("room");
      localStorage.removeItem("user");
      window.location.replace("index.html")
}

function update_like(message_id) {
      console.log(message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      console.log(likes);
      updated_like = Number(likes) + 1;
      console.log(updated_like);
      firebase.database().ref(room).child(message_id).update({
            like: updated_like
      });
}