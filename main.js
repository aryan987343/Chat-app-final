function log_in() {
    user = document.getElementById("user_name_input").value;
    
    localStorage.setItem("user", user);
    
    window.location = "chat_room.html"
    }