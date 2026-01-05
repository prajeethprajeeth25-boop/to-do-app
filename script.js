let users = JSON.parse(localStorage.getItem("users")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* REGISTER */
function register() {
    let u = regUser.value;
    let p = regPass.value;

    if(u === "" || p === "") {
        alert("Fill all fields");
        return;
    }

    let exists = users.find(user => user.username === u);
    if(exists) {
        alert("User already exists");
        return;
    }

    users.push({username:u, password:p});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    window.location.href = "login.html";
}

/* LOGIN */
function login() {
    let u = loginUser.value;
    let p = loginPass.value;

    let user = users.find(user => user.username === u && user.password === p);

    if(user) {
        localStorage.setItem("loggedUser", u);
        window.location.href = "dashboard.html";
    } else {
        msg.innerText = "Invalid login";
    }
}

/* Protect dashboard */
if(window.location.pathname.includes("dashboard")) {
    if(!localStorage.getItem("loggedUser")) {
        window.location.href = "login.html";
    }
}

/* LOGOUT */
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

/* TASKS */
function addTask() {
    let text = taskText.value;
    let cat = category.value;
    let user = localStorage.getItem("loggedUser");

    if(text === "") return;

    tasks.push({text, cat, user});
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskText.value = "";
    displayTasks();
}

function displayTasks() {
    let user = localStorage.getItem("loggedUser");
    taskList.innerHTML = "";

    tasks.filter(t => t.user === user).forEach((t,i)=>{
        let li = document.createElement("li");
        li.innerHTML = `${t.text} (${t.cat}) <button onclick="delTask(${i})">❌</button>`;
        taskList.appendChild(li);
    });
}

function delTask(i){
    tasks.splice(i,1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

displayTasks();
