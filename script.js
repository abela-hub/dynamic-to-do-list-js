document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage when the page loads
    loadTasks();

    // Add task when the button is clicked
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });

    // Function to add a new task
    function addTask(taskText, saveToLocalStorage = true) {
        const li = document.createElement('li');
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        
        removeBtn.addEventListener('click', () => {
            li.remove();
            updateLocalStorage();
        });
        
        li.appendChild(taskSpan);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
        
        if (saveToLocalStorage) {
            updateLocalStorage();
        }
    }

    // Function to update local storage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#taskList li span').forEach(taskElement => {
            tasks.push(taskElement.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(task => {
            addTask(task, false); // false to prevent saving to local storage again
        });
    }
});