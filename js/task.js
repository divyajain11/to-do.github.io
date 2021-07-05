console.log('Hello, this is task.js!');

let clearBtn = document.getElementById('clearBtn');
const pendingTasks = document.querySelector(".pendingTasks");
pendingTasks.textContent = 0;
let addTask = document.getElementById("addTask");


function enablePlusBtn() {
    let addTask = document.getElementById("addTask");
    if (addTask.value.trim() != 0) {
        plusBtn.classList.add("active");
    } else {
        plusBtn.classList.remove("active");
    }
}

showTasks();

// If user adds a task, add it to the localStorage
let plusBtn = document.getElementById("plusBtn");
plusBtn.addEventListener('click', function (e) {
    let addTask = document.getElementById("addTask");
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(tasks);
    }
    taskObj.push(addTask.value);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    addTask.value = "";
    enablePlusBtn();
    console.log(taskObj);
    showTasks();
});

// Function to show elements from localStorage
function showTasks() {
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(tasks);
    }
    const pendingTasks = document.querySelector(".pendingTasks");
    pendingTasks.textContent = taskObj.length;

    if (taskObj.length > 0) {
        clearBtn.classList.add("active");//activated only is there is a task
    } else {
        clearBtn.classList.remove("active"); // otherwise disabled 
    }

    let html = '';
    taskObj.forEach(function (element, index) {
        html += `<li class="added-todo" id="added-todo${index}"> ${element}
        <button class="delBtn" id="${index}" onclick="deleteTask(this.id)"><i class="fa fa-trash"></i></button>
        <button class="checkBtn" id="${index}" onclick="completeTask(this.id)"><i class="fa fa-check"></i></button>
        </li>`;

    });
    let taskElm = document.getElementById("tasks");
    if (taskObj.length != 0) {
        taskElm.innerHTML = html;
    } else {
        taskElm.innerHTML = `Nothing to show! Use "Add a Task" section above to add tasks.`;
    }
}

// Function to delete a task
function deleteTask(index) {
    console.log("I am deleting task", index);

    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasks); //string to array
    }

    taskObj.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskObj));//array to string
    showTasks();
}

// Function to complete a task
var isCompleted = false;
function completeTask(index) {
    let addedTodo = document.getElementById(`added-todo${index}`);
    if (isCompleted) {
        addedTodo.style.backgroundColor = "rgb(207, 236, 170)";
        isCompleted = false;
        console.log("Incompleting task", index);
        pendingTasks.textContent++;
    } else {
        addedTodo.style.backgroundColor = "rgb(112, 241, 107)";
        isCompleted = true;
        console.log("Completing task", index);
        pendingTasks.textContent--;
    }
}





// Function to clear all tasks
function clearAll() {
    console.log('All tasks cleared');
    const pendingTasks = document.querySelector(".pendingTasks");
    pendingTasks.textContent = 0;
    taskObj = [];
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    showTasks();
}


