///variables
const heading = document.querySelector("header");
const headingContainer = document.createElement("div");

const mainContainer = document.createElement("div"); //for main content
const listContainer = document.createElement("div"); //for task list
const input = document.createElement("input");
const container = document.createElement("div"); //for input and buttons
const addButton = document.createElement("button");
const deleteButton = document.createElement("button");
const editButton = document.createElement("button");
const ul = document.createElement("ul");
const taskCheckbox = document.createElement("input");

/// assigning classes and attributes
taskCheckbox.type = "checkbox";
taskCheckbox.className = "task-checkbox";
headingContainer.className = "heading-container";
headingContainer.appendChild(heading);
document.body.appendChild(headingContainer);
input.type = "text";
mainContainer.className = "main-container";
listContainer.className = "list-container";
mainContainer.appendChild(container);
listContainer.appendChild(ul);
mainContainer.appendChild(listContainer);
document.body.appendChild(mainContainer);
addButton.textContent = "Add Task";
addButton.className = "add-button";
deleteButton.className = "add-button";
deleteButton.setAttribute("id", "deleteButton");
editButton.setAttribute("id", "editButton");
editButton.className = "add-button";
ul.className = "task-list";
ul.style.listStyleType = "none"; // Remove default list style
ul.style.padding = "2px";
ul.style.display = "flex";
ul.style.flexDirection = "column";
ul.style.gap = "2px";
deleteButton.textContent = "Delete";
editButton.textContent = "Edit";
input.placeholder = "Enter a new task";
container.className = "task-container";
input.setAttribute("id", "taskInput");
container.appendChild(input);
container.appendChild(addButton);

//functions
// Function to add a task
function addTask() {
  const taskText = input.value.trim();
  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  // Create the task item
  const li = document.createElement("li");
  li.textContent = taskText;
  li.className = "task-item";

  //create the right side of the task item
  const rightSide = document.createElement("span");
  rightSide.className = "task-buttons";
  rightSide.appendChild(editButton.cloneNode(true));
  rightSide.appendChild(deleteButton.cloneNode(true));
  rightSide.style.display = "flex";
  rightSide.style.gap = "5px";

  /// Create the left side of the task item
  const leftSide = document.createElement("span");
  leftSide.className = "checkbox-task";

  ///styling the left side
  leftSide.style.display = "flex";
  leftSide.style.gap = "10px";
  leftSide.style.flexDirection = "row";

  /// Create a task item with a checkbox, edit, and delete buttons
  const cloneTaskCheckbox = taskCheckbox.cloneNode(true);
  leftSide.appendChild(cloneTaskCheckbox);
  leftSide.appendChild(li);

  // Create a div to hold the task item and buttons
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.appendChild(leftSide);
  taskDiv.appendChild(rightSide);
  taskDiv.style.display = "flex";
  // taskDiv.style.fontFamily = "dancing script";
  taskDiv.style.justifyContent = "space-between";
  taskDiv.style.alignItems = "center";
  taskDiv.style.padding = "10px";
  taskDiv.style.backgroundColor = "rgb(241, 209, 198)";
  taskDiv.style.borderRadius = "5px";
  taskDiv.style.marginBottom = "2px";
  taskDiv.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
  ul.appendChild(taskDiv);
  input.value = ""; // Clear the input field after adding a task
}
function deleteTask(event) {
  if (event.target.id === "deleteButton") {
    const targetDiv = event.target.parentElement; // Get the parent div of the delete button
    const taskItem = targetDiv.parentElement; // Get the parent li of the task item
    ul.removeChild(taskItem); // Remove the task item from the list
  }
}
function editTask(event) {
  if (event.target.id === "editButton") {
    console.log("Edit button clicked");
    const targetParent = event.target.parentElement; // Get the parent div of the edit button
    console.log(targetParent);
    const siblingDiv = targetParent.previousElementSibling; // Get the sibling div which contains the task item
    console.log(siblingDiv);
    const taskItem = siblingDiv.querySelector(".task-item"); // Get the task div
    console.log(taskItem.textContent);
    const newTaskText = prompt("Edit your task:", taskItem.textContent);
    console.log("new task text", newTaskText);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskItem.textContent = newTaskText.trim();
    } else {
      alert("Task cannot be empty.");
    }
  }
}

function toggleCheckbox(event) {
  if (event.target.classList.contains("task-checkbox")) {
    const taskItem = event.target.parentElement.querySelector(".task-item");
    if (event.target.checked) {
      taskItem.style.textDecoration = "line-through";
    } else {
      taskItem.style.textDecoration = "none";
    }
  }
}
// Event listeners
ul.addEventListener("change", toggleCheckbox);
addButton.addEventListener("click", addTask);
ul.addEventListener("click", deleteTask);
ul.addEventListener("click", editTask);
