const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);

        li.addEventListener('click', completeTask);
    }
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = taskList.children;

    for (let i = 0; i < taskItems.length; i++) {
        tasks.push(taskItems[i].firstChild.textContent); // Only store the task text
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;
            taskList.appendChild(li);
            li.addEventListener('click', completeTask);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteTask);
            li.appendChild(deleteBtn);
        });
    }
}

function completeTask(event) {
    const task = event.target;
    task.classList.toggle('completed');
}

function deleteTask(event) {
    const task = event.target.parentElement;
    taskList.removeChild(task);
    saveTasksToLocalStorage(); // Update local storage
}

loadTasksFromLocalStorage();