document.addEventListener("DOMContentLoaded", function() {
 loadTasks();
});

function addTask() {
 const taskInput = document.getElementById("taskInput");
 const taskList = document.getElementById("taskList");

 if (taskInput.value.trim() === "") {
   alert("Please enter a task!");
   return;
 }

 const taskItem = document.createElement("li");
 taskItem.className = "taskItem";
 const currentDate = new Date();
 const dateString = currentDate.toLocaleDateString();
 const timeString = currentDate.toLocaleTimeString();

 taskItem.innerHTML = `
   <input type="checkbox" onchange="saveTasks()">
   <span class="editable" onclick="editTask(this)">${taskInput.value}</span>
   <div class="metadata">
     <strong>Date:</strong> ${dateString} <br>
     <strong>Time:</strong> ${timeString} <br>
     <strong>File Size:</strong> ${calculateFileSize(taskInput.value)} bytes
   </div>
   <span class="editButton" onclick="renameTask(this)">Edit</span>
   <span class="deleteButton" onclick="deleteTask(this)">Delete</span>
 `;

 taskList.appendChild(taskItem);
 taskInput.value = "";
 saveTasks();
}

function calculateFileSize(text) {
 // A simple function to simulate calculating the file size based on the text length
 return text.length;
}

function editTask(editableSpan) {
 const taskText = editableSpan.innerText;
 const newTaskText = prompt("Edit task:", taskText);

 if (newTaskText !== null) {
   editableSpan.innerText = newTaskText;
   saveTasks();
 }
}

function renameTask(editButton) {
 const taskItem = editButton.parentElement;
 const editableSpan = taskItem.querySelector(".editable");
 editTask(editableSpan);
}

function deleteTask(deleteButton) {
 const taskList = document.getElementById("taskList");
 const taskItem = deleteButton.parentElement;
 taskList.removeChild(taskItem);
 saveTasks();
}

function saveTasks() {
 const taskList = document.getElementById("taskList");
 const tasks = [];

 for (const taskItem of taskList.childNodes) {
   if (taskItem.tagName === "LI") {
     const taskText = taskItem.querySelector(".editable").innerText;
     const isChecked = taskItem.querySelector("input[type='checkbox']").checked;

     tasks.push({ text: taskText, checked: isChecked });
   }
 }

 localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
 const taskList = document.getElementById("taskList");
 const storedTasks = localStorage.getItem("tasks");

 if (storedTasks) {
   const tasks = JSON.parse(storedTasks);

   for (const task of tasks) {
     const taskItem = document.createElement("li");
     taskItem.className = "taskItem";
     const currentDate = new Date();
     const dateString = currentDate.toLocaleDateString();
     const timeString = currentDate.toLocaleTimeString();

     taskItem.innerHTML = `
       <input type="checkbox" onchange="saveTasks()" ${task.checked ? "checked" : ""}>
       <span class="editable" onclick="editTask(this)">${task.text}</span>
       <div class="metadata">
         <strong>Date:</strong> ${dateString} <br>
         <strong>Time:</strong> ${timeString} <br>
         <strong>File Size:</strong> ${calculateFileSize(task.text)} bytes
       </div>
       <span class="editButton" onclick="renameTask(this)">Edit</span>
       <span class="deleteButton" onclick="deleteTask(this)">Delete</span>
     `;

     taskList.appendChild(taskItem);
   }
 }
}

