



document.addEventListener("DOMContentLoaded", function() {
    // Set the default view to "table" when the page loads
    switchView('table');

    // Add event listeners to all buttons in the view selector
    document.querySelectorAll(".view-selector button").forEach(button => {
        button.addEventListener("click", function () {
            switchView(this.getAttribute("data-view"));
        });
    });
});

/*
Function to switch between different views (Table, Cards, Kanban)
*/ 
function switchView(view) {
    // Hide all task views
    document.querySelectorAll(".task-view").forEach(div => {
        div.style.display = "none";
    });
    // Display the selected view
    document.getElementById(view + "View").style.display = "block";
}

/*
Function to add a new task.
It trims spaces from the input and assigns the task to the active view.
*/
function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    if (taskText === "") {
        return; // Prevent adding empty tasks
    }
    
    // Get the current visible task view
    let currentView = document.querySelector(".task-view[style='display: block;']").id;

    // Add task to the corresponding view
    if (currentView === "tableView") {
        addTaskToTable(taskText);
    } else if (currentView === "cardsView") {
        addTaskToCard(taskText);
    } else {
        addTaskToKanban(taskText);
    }

    // Clear the input field after adding the task
    document.getElementById("taskInput").value = "";

    console.log("addTask function is running"); // בדיקת הרצה

}

/*
Function to add a task to the table view.
Each task is assigned to a random day of the week.
*/
function addTaskToTable(taskText) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let randomDay = days[Math.floor(Math.random() * days.length)];
    
    // Create a new table row
    let row = document.createElement("tr");
    row.innerHTML = `<td>${randomDay}</td>
                     <td>${taskText}</td>
                     <td><button onclick="deleteTask(this)">❌</button></td>`;
    document.getElementById("taskTable").appendChild(row);
}

/*
Function to add a task to the card view.
Each task is wrapped inside a dynamically created "div" element.
*/
function addTaskToCard(taskText) {
    let card = document.createElement("div");
    card.classList.add("task-card");
    card.innerHTML = `<p>${taskText}</p> 
                      <button onclick="deleteTask(this)">❌</button>`;
    document.getElementById("taskContainer").appendChild(card);
}

/*
Function to add a task to the Kanban board.
Each task is made draggable to allow movement between columns.
*/
function addTaskToKanban(taskText) {
    if (!taskText.trim()) return;
    
    let kanban = document.createElement("div");
    kanban.classList.add("task-item");
    kanban.setAttribute("draggable", "true");
    kanban.setAttribute("ondragstart", "drag(event)");
    
    kanban.innerHTML = `${taskText} 
                        <button onclick="deleteTask(this)">❌</button>`;
    
    document.getElementById("todo").querySelector(".task-container").appendChild(kanban);
}

/*
Function to delete a task from any view.
It removes the parent element (task) of the clicked delete button.
*/
function deleteTask(button) {
    button.parentElement.remove();
}

/*
A function to edit a task.
*/ 
function editTask(button) {
    let taskElement = button.parentElement.querySelector(".task-text");
    let currentText = taskElement.innerText;


    //create an input field for the editing.
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText;
    inputField.classList.add("edit-input");

    //replace the task text with the input field.
    button.parentElement.replaceChild(inputField, taskElement);

    //change the edit button to save button.

    button.innerText = "💾"
    button.setAttribute("onclick", "saveTask(this)");


}
    /*
    A function to save the edited task.
    */ 

    function saveTask(button) {
        let inputField = button.parentElement.querySelector(".edit-input");
        let newText = inputField.value.trim();

        if(newText == "") {
            return;
        }

        let taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.innerText = newText;

        button.parentElement.replaceChild(taskText, inputField);

        button.innerText = "✏️"
        button.setAttribute("onclick", "editTask(this)");

    }









/*
Function to handle the drag event.
Saves the dragged element's ID to the dataTransfer object.
*/
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

/*
Function to allow dropping tasks in a new column.
Prevents the default behavior which blocks dropping.
*/
function allowDrop(event) {
    event.preventDefault();
}

/*
Function to handle dropping a task in a new column.
Retrieves the dragged task and appends it to the new location.
*/
function drop(event) {
    event.preventDefault();
    let taskID = event.dataTransfer.getData("text");
    let taskElement = document.getElementById(taskID);
    
    event.target.querySelector(".task-container").appendChild(taskElement);
}
