// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const taskText = document.createElement('span');
        taskText.textContent = task;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';
        
        // Create Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        // Add event listener directly to the button
        editButton.addEventListener('click', function() {
            updateTask(index);
        });
        
        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        // Add event listener directly to the button
        deleteButton.addEventListener('click', function() {
            deleteTask(index);
        });
        
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        
        li.appendChild(taskText);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    });
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

// Function to update a task
function updateTask(index) {
    const currentTask = tasks[index];
    const newTask = prompt('Update task:', currentTask);
    
    if (newTask !== null) {
        const trimmedTask = newTask.trim();
        if (trimmedTask) {
            tasks[index] = trimmedTask;
            saveTasks();
            renderTasks();
        } else {
            alert('Task cannot be empty!');
        }
    }
}

// Function to delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Event listeners
addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();