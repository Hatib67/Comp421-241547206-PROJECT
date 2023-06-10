// Task Manager
const taskManager = {
    tasks: [],

    addTask: function (task) {
        this.tasks.push(task);
    },

    deleteTask: function (taskIndex) {
        this.tasks.splice(taskIndex, 1);
    },

    updateTask: function (taskIndex, updatedTask) {
        this.tasks[taskIndex] = updatedTask;
    }
};

// DOM Elements
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const dueDateInput = document.getElementById('due-date-input');
const statusSelect = document.getElementById('status-select');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

// Functions
function addTask() {
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const status = statusSelect.value;

    if (title === '' || description === '' || dueDate === '') {
        alert('Please fill in all fields.');
        return;
    }

    const newTask = { title, description, dueDate, status };
    taskManager.addTask(newTask);

    renderTaskList();
    clearInputFields();
}

function deleteTask(taskIndex) {
    taskManager.deleteTask(taskIndex);
    renderTaskList();
}

function updateTask(taskIndex, updatedTask) {
    taskManager.updateTask(taskIndex, updatedTask);
    renderTaskList();
}

function clearInputFields() {
    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    statusSelect.value = 'pending';
}

function renderTaskList() {
    taskList.innerHTML = '';

    if (taskManager.tasks.length === 0) {
        taskList.innerHTML = 'No tasks found.';
        return;
    }

    taskManager.tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('description');
        descriptionElement.textContent = task.description;

        const dueDateElement = document.createElement('div');
        dueDateElement.classList.add('due-date');
        dueDateElement.textContent = 'Due Date: ' + task.dueDate;

        const statusElement = document.createElement('div');
        statusElement.classList.add('status');
        statusElement.textContent = 'Status: ' + task.status;

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            const updatedTask = promptTaskDetails(task);
            if (updatedTask) {
                updateTask(index, updatedTask);
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            const confirmDelete = confirm('Are you sure you want to delete this task?');
            if (confirmDelete) {
                deleteTask(index);
            }
        });

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(dueDateElement);
        taskElement.appendChild(statusElement);
        taskElement.appendChild(editBtn);
        taskElement.appendChild(deleteBtn);

        taskList.appendChild(taskElement);
    });
}

function promptTaskDetails(task) {
    const updatedTask = { ...task };

    updatedTask.title = prompt('Title:', task.title);
    updatedTask.description = prompt('Description:', task.description);
    updatedTask.dueDate = prompt('Due Date:', task.dueDate);
    updatedTask.status = prompt('Status:', task.status);

    return updatedTask;
}

// Initial rendering
renderTaskList();
