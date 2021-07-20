console.log('Hello, this is task.js!');

var taskInput = document.getElementById("new-task"); //new-task
var timeInput = document.getElementById("due-time");
var priorityInput = document.getElementById("priority");
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString) {
    //Create List Item
    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var dueTime = document.createElement("span");

    var priority = document.createElement("span");

    var editInput = document.createElement("input"); // text
    //button.edit

    var editTime = document.createElement("input"); // text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Each element needs modifying

    checkBox.type = "checkbox";
    editInput.type = "text";
    priorityInput.type = "number";
    editTime.type = "time";
    timeInput.type = "time";

    editButton.innerText = "Edit";
    editButton.className = "edit editBtn btn";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete btn";

    label.innerText = taskString;
    dueTime.innerText = timeInput.value;
    priority.innerText = priorityInput.value;
    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(priority);
    listItem.appendChild(dueTime);
    listItem.appendChild(editTime);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

//Add a new task
var addTask = function() {
    console.log("Add task...");
    if (taskInput.value.trim() != 0) {
        //Create a new list item with the text from #new-task:
        var listItem = createNewTaskElement(taskInput.value);
        //Append listItem to incompleteTasksHolder
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }
    taskInput.value = "";
    timeInput.value = "";
    priorityInput.value = "";
}

// Execute a function when the user releases a key on the keyboard
taskInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.code === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("add").click();
    }
});

timeInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.code === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("add").click();
    }
});

//Edit an existing task
var editTask = function() {
    console.log("Edit task and time...");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");

    var editTime = listItem.querySelector("input[type=time");
    var dueTime = listItem.querySelector("span");

    var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
        editTime.style.display = "none";
        dueTime.innerText = editTime.value;
    } else {
        //Switch to .editMode
        //input value becomes the label's text
        editInput.value = label.innerText;
        editTime.style.display = "block";
        editTime.value = dueTime.innerText;
    }

    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
    console.log("Delete task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    //Remove the parent list item from the ul
    ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
    console.log("Task complete...");
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
    console.log("Task incomplete...");
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
    editButton.onclick = editTask;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
    console.log("AJAX request");
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}