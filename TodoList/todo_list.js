// This line retrieves the HTML element with the ID "taskInput" from the document, assigning it to the constant variable taskInput. 
// It enables access to the input field where users can enter new tasks using JavaScript in the Todo List application.
const taskInput = document.getElementById("taskInput");

/*
Next, document.getElementById() is used to retrieve specific elements from the HTML document by their unique IDs, such as:
- addTaskBtn fetches the button element responsible for adding tasks.
- taskList retrieves the unordered list element where tasks are displayed.
- clearCompletedBtn accesses the button used to clear completed tasks.
*/
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Declare an empty array with a variable named tasks.
let tasks = [];

/*
addTask function.
- taskText variable to retrieve the value entered into the taskInput HTML element by the user, trimming any trailing whitespace.
- A conditional statement that uses an if block to check if the taskText is not an empty string; if not, it creates a new task object with the entered text.
- Addition of this new task object using the push array method to the tasks array, representing the ToDo List.
- Resetting the value of the taskInput field to an empty string after adding the task, clearing the input for the next task entry.
- Calling the displayTasks function to display entered todo tasks, which you will create in the next step.
*/
function addTask() {
	const taskText = taskInput.value.trim();
	if (taskText !== "") {
			tasks.push({ text: taskText});
			taskInput.value = "";
			displayTasks();
		}
	}
	
/*
displayTask function
- taskList.innerHTML = ""; to clear the existing content within the taskList element by setting its innerHTML to an empty string.
- tasks.forEach iterates through the tasks array using forEach, creating a list item <li> for each task.
- It constructs HTML content for each task by assigning it to li.innerHTML, which includes a checkbox, a label displaying the task text, and corresponding IDs.
- Then, with the help of li.querySelector, it sets up an event listener for each checkbox within the task list <li> element. 
When the checkbox state changes, it triggers the toggleTask() function, which you will create in the next step.
-  Then appends the newly created list item containing the task details in the To-Do List interface using the appendChild method.
*/
function displayTasks() {
	taskList.innerHTML = "";
	tasks.forEach((task, index) => {
		const li = document.createElement("li");
		li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
				<label for="task-${index}">${task.text}</label>`;
		li.querySelector("input").addEventListener("change", () => toggleTask(index));
		taskList.appendChild(li);
		});
	}

/*
toggleTask function
- This toggleTask function toggles the completion status of a specific task in the tasks array based on the provided index.
- It helps by selecting the checkbox regardless. If selected, then it will mark that particular task as completed.
- For this, you need to call one more function called the clearCompletedTasks function.
*/
function toggleTask(index) {
	tasks[index].completed = !tasks[index].completed;
	displayTasks();
}

/*
clearCompletedTasks function
- the filter method filters the task array, which has the list of tasks entered by users.
- tasks.filter(task => !task.completed); code filters the tasks array to retrieve only the tasks that are not marked as completed (task.completed is false), 
returning a new array excluding completed tasks.
*/
function clearCompletedTasks() {
	tasks = tasks.filter(task => !task.completed);
	displayTasks();
}

//Perform addEventListener for addTask and clearCompletedTasks buttons to listen for clicks after clicking the Add Task and Clear Completed buttons.
addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

//The function calls the displayTasks function to show the entered todo task after clicking the Add Task button.
displayTasks();