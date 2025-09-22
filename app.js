const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-completed');
const filters = document.querySelectorAll('.filters button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function render() {
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        if (task.done) li.classList.add('completed');
        li.onclick = () => toggleTask(task.id);
        list.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(title) {
    if (!title.trim()) return;
    tasks.push({ id: Date.now(), title, done: false });
    render();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    render();
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.done);
    render();
}

addBtn.onclick = () => { addTask(input.value); input.value = ''; };
input.addEventListener('keydown', e => { if (e.key === 'Enter') { addTask(input.value); input.value = ''; } });
clearBtn.onclick = clearCompleted;

filters.forEach(btn => btn.onclick = () => {
    const filter = btn.dataset.filter;
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (filter === 'all') tasks = allTasks;
    if (filter === 'active') tasks = allTasks.filter(t => !t.done);
    if (filter === 'completed') tasks = allTasks.filter(t => t.done);
    render();
});

render();
