
// 🕒 Waktu real-time
const updateTime = () => {
  const now = new Date();
  document.getElementById('time').textContent = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
setInterval(updateTime, 1000);
updateTime();


// 🗂️ Catatan (Dashboard Class)

class Dashboard {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.editingId = null;
    this.bindSearchAndFilter();
    this.render();
  }

  // Arrow function 1
  bindSearchAndFilter = () => {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => this.render());
    }
    // Filter
    const filterDay = document.querySelector('.task-header select#filterDay');
    if (filterDay) {
      filterDay.addEventListener('change', () => this.render());
    }
  }

  // Arrow function 2
  save = () => localStorage.setItem('tasks', JSON.stringify(this.tasks));

  // Arrow function 3 (async/await)
  add = async (matakuliah, day, deadline, description) => {
    // Simulasi proses async (misal: simpan ke server, dsb)
    await new Promise(resolve => setTimeout(resolve, 200));
    if (this.editingId) {
      // Edit mode
      this.tasks = this.tasks.map(t => t.id === this.editingId ? { ...t, matakuliah, day, deadline, description } : t);
      this.editingId = null;
    } else {
      // Add mode
      const newTask = {
        id: Date.now(),
        matakuliah,
        day,
        deadline,
        description,
        createdAt: new Date().toISOString()
      };
      this.tasks = [...this.tasks, newTask];
    }
    this.save();
    this.render();
  }

  remove = id => {
    if (!confirm("Yakin ingin menghapus tugas ini?")) return;
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
    this.render();
  }

  edit = id => {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    document.getElementById('taskMatakuliah').value = task.matakuliah;
    document.getElementById('taskDay').value = task.day;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskInput').value = task.description;
    this.editingId = id;
    document.getElementById('taskMatakuliah').focus();
  }

  filterTasks = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    // Only use the filter in the task list header, not the form
    const filterDay = document.querySelector('.task-header select#filterDay');
    const selectedDay = filterDay ? filterDay.value : '';
    return this.tasks.filter(task => {
      const matchesSearch = task.matakuliah.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm);
      const matchesDay = !selectedDay || task.day === selectedDay;
      return matchesSearch && matchesDay;
    });
  }

  formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  render = () => {
    const list = document.getElementById('taskList');
    const empty = document.getElementById('emptyState');
    const filteredTasks = this.filterTasks();
    list.innerHTML = filteredTasks.map(({ id, matakuliah, day, deadline, description }) => `
      <li class="task-item" data-id="${id}">
        <div class="task-content">
          <div class="task-header-info">
            <span>${matakuliah}</span>
            <span>${day} - ${this.formatDate(deadline)}</span>
          </div>
          <p class="task-text">${description}</p>
        </div>
        <div class="task-actions">
          <button class="edit" data-id="${id}">✏️</button>
          <button class="delete" data-id="${id}">🗑️</button>
        </div>
      </li>
    `).join('');
    empty.classList.toggle('hidden', filteredTasks.length > 0);
    // Event delegation for edit/delete
    list.removeEventListener('click', this.handleListClick);
    list.addEventListener('click', this.handleListClick);
  }

  // Arrow function 4 (for event delegation)
  handleListClick = (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (btn.classList.contains('edit')) {
      this.edit(id);
    } else if (btn.classList.contains('delete')) {
      this.remove(id);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new Dashboard();
  // Event listener for adding or editing tasks (form submit)
  document.getElementById('taskForm').addEventListener('submit', async e => {
    e.preventDefault();
    const matakuliah = document.getElementById('taskMatakuliah').value.trim();
    const day = document.getElementById('taskDay').value;
    const deadline = document.getElementById('taskDeadline').value;
    const description = document.getElementById('taskInput').value.trim();
    if (!matakuliah || !day || !deadline || !description) {
      return alert("Semua field harus diisi!");
    }
    await dashboard.add(matakuliah, day, deadline, description);
    // Reset form
    document.getElementById('taskMatakuliah').value = '';
    document.getElementById('taskDay').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskInput').value = '';
    document.getElementById('taskMatakuliah').focus();
  });
});
