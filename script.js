document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        const taskItems = _.map(tasks, task => {
            return `
                <li class="${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    ${task.text}
                    <button class="remove">Eliminar</button>
                </li>
            `;
        });
        taskList.innerHTML = taskItems.join('');
    }

    function addTask(text) {
        const newTask = {
            id: _.uniqueId(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
    }

    function removeTask(id) {
        tasks = _.filter(tasks, task => task.id !== id);
        renderTasks();
    }

    function toggleTaskCompletion(id) {
        _.forEach(tasks, task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
        });
        renderTasks();
    }

    addTaskButton.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            addTask(text);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const li = target.closest('li');
        const id = li ? li.getAttribute('data-id') : null;

        if (target.classList.contains('remove')) {
            removeTask(id);
        } else if (li) {
            toggleTaskCompletion(id);
        }
    });

    // Cargar tareas desde JSON local
    fetch('tasks.json')
        .then(response => response.json())
        .then(data => {
            tasks = data;
            renderTasks();
        })
        .catch(error => console.error('Error al cargar las tareas:', error));
});

