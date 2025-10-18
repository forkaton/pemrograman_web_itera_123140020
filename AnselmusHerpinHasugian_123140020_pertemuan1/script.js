let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Migrate existing tasks: ensure courseNormalized and isoDate exist
function migrateTasksIfNeeded() {
  let changed = false;
  tasks = tasks.map(t => {
    const task = Object.assign({}, t);
    if (!task.courseNormalized && task.course) {
      task.courseNormalized = task.course.toLowerCase().trim();
      changed = true;
    }
    if (!task.isoDate && task.deadline) {
      // try to parse existing formats (DD/MM/YYYY or YYYY-MM-DD)
      const parts = String(task.deadline).split(/[-\/]/);
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          task.isoDate = `${parts[0]}-${parts[1].padStart(2,'0')}-${parts[2].padStart(2,'0')}`;
        } else {
          // DD/MM/YYYY
          task.isoDate = `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
        }
        changed = true;
      }
    }
    return task;
  });
  if (changed) saveTasks();
}

migrateTasksIfNeeded();

const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');
const search = document.getElementById('search');
const stats = document.getElementById('stats');
const statusFilter = document.getElementById('statusFilter');
const courseFilter = document.getElementById('courseFilter');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function populateCourseFilter() {
  // Use normalized values to avoid duplicate entries differing only by case/spacing
  const map = new Map();
  tasks.forEach(t => {
    if (t.course) {
      const norm = (t.courseNormalized || t.course.toLowerCase().trim());
      if (!map.has(norm)) map.set(norm, t.course);
    }
  });
  courseFilter.innerHTML = '<option value="all">Semua Mata Kuliah</option>';
  // sort by display name (case-insensitive)
  const entries = Array.from(map.entries()).sort((a,b) => a[1].toLowerCase().localeCompare(b[1].toLowerCase()));
  entries.forEach(([norm, original]) => {
    const opt = document.createElement('option');
    opt.value = norm;
    // Title-case the display for nicer UI
    opt.textContent = original.split(' ').map(s => s.charAt(0).toUpperCase()+s.slice(1)).join(' ');
    courseFilter.appendChild(opt);
  });
}

function renderTasks() {
  list.innerHTML = '';
  const q = search.value.trim().toLowerCase();
  const status = statusFilter.value;
  const course = courseFilter.value;

  const filtered = tasks.filter(task => {
    if (q && !task.name.toLowerCase().includes(q) && !((task.course||'').toLowerCase().includes(q))) return false;
    if (status === 'unfinished' && task.completed) return false;
    if (status === 'completed' && !task.completed) return false;
    if (course !== 'all') {
      const norm = task.courseNormalized || (task.course || '').toLowerCase().trim();
      if (norm !== course) return false;
    }
    return true;
  });

  // sort by isoDate (earliest first), fall back to creation order
  filtered.sort((a,b) => {
    if (a.isoDate && b.isoDate) return a.isoDate.localeCompare(b.isoDate);
    if (a.isoDate) return -1;
    if (b.isoDate) return 1;
    return 0;
  });

  filtered.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task';
    if (task.completed) li.classList.add('completed');

    const left = document.createElement('div');
  left.innerHTML = `<strong>${escapeHtml(task.name)}</strong> - ${escapeHtml(task.course)} <br><small>🗓️ ${task.deadline}</small>`;

    const right = document.createElement('div');
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? '↩️' : '✅';
    toggleBtn.title = task.completed ? 'Tandai belum selesai' : 'Tandai selesai';
    toggleBtn.addEventListener('click', () => toggleComplete(task.id));

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.title = 'Edit tugas';
    editBtn.addEventListener('click', () => startEdit(task.id));

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.title = 'Hapus tugas';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    right.appendChild(toggleBtn);
    right.appendChild(editBtn);
    right.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(right);
    list.appendChild(li);
  });

  const unfinished = tasks.filter(t => !t.completed).length;
  stats.textContent = `📊 Tugas belum selesai: ${unfinished}`;
  populateCourseFilter();
}

function validateTaskInput(name, course, deadline) {
  if (!name) return 'Nama tugas tidak boleh kosong.';
  if (!course) return 'Mata kuliah tidak boleh kosong.';
  if (!deadline) return 'Deadline harus diisi.';
  // deadline is expected as DD/MM/YYYY
  const parts = deadline.split('/');
  if (parts.length !== 3) return 'Format deadline harus DD/MM/YYYY.';
  const [dStr, mStr, yStr] = parts;
  const d = Number(dStr);
  const m = Number(mStr);
  const y = Number(yStr);
  if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) return 'Deadline tidak valid.';
  const dateObj = new Date(y, m - 1, d);
  if (dateObj.getFullYear() !== y || dateObj.getMonth() !== (m - 1) || dateObj.getDate() !== d) return 'Tanggal deadline tidak valid.';
  const today = new Date();
  today.setHours(0,0,0,0);
  dateObj.setHours(0,0,0,0);
  if (dateObj < today) return 'Deadline tidak boleh sebelum hari ini.';
  return '';
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s]);
}
function formatDateParts(day, month, year) {
  if (!day && !month && !year) return '';
  const d = String(day).padStart(2, '0');
  const m = String(month).padStart(2, '0');
  const y = String(year);
  return `${d}/${m}/${y}`;
}

function isoFromDeadline(deadline) {
  if (!deadline) return '';
  const parts = String(deadline).split('/');
  if (parts.length !== 3) return '';
  const d = parts[0].padStart(2,'0');
  const m = parts[1].padStart(2,'0');
  const y = parts[2];
  return `${y}-${m}-${d}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('taskName').value.trim();
  const course = document.getElementById('courseName').value.trim();
  const day = document.getElementById('deadlineDay').value.trim();
  const month = document.getElementById('deadlineMonth').value.trim();
  const year = document.getElementById('deadlineYear').value.trim();
  const deadline = formatDateParts(day, month, year);
  const idField = document.getElementById('taskId');

  const validationError = validateTaskInput(name, course, deadline);
  if (validationError) {
    alert(validationError);
    return;
  }

  if (idField && idField.value) {
    const id = Number(idField.value);
    const t = tasks.find(x => x.id === id);
    if (t) Object.assign(t, { name, course, deadline, courseNormalized: course.toLowerCase().trim(), isoDate: isoFromDeadline(deadline) });
    idField.value = '';
    form.querySelector('button[type=submit]').textContent = '➕ Tambah Tugas';
  } else {
    tasks.push({ id: generateId(), name, course, deadline, completed: false, courseNormalized: course.toLowerCase().trim(), isoDate: isoFromDeadline(deadline) });
  }
  // add a small visual effect for newly added task (render will recreate list)
  // flash the container briefly
  const container = document.querySelector('.container');
  container.classList.add('flash');
  setTimeout(() => container.classList.remove('flash'), 300);

  saveTasks();
  renderTasks();
  form.reset();
});

// auto-tab date inputs when filled
['deadlineDay','deadlineMonth'].forEach(id => {
  const el = document.getElementById(id);
  el && el.addEventListener('input', (e) => {
    const v = e.target.value;
    if (v.length >= (id==='deadlineDay'?2:2)) {
      if (id === 'deadlineDay') document.getElementById('deadlineMonth').focus();
      else if (id === 'deadlineMonth') document.getElementById('deadlineYear').focus();
    }
  });
});

function toggleComplete(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.completed = !t.completed;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  if (confirm('Hapus tugas ini?')) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }
}

function startEdit(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  document.getElementById('taskName').value = t.name;
  document.getElementById('courseName').value = t.course;
  // populate split date inputs (expects DD/MM/YYYY)
  const parts = String(t.deadline || '').split(/[-\/]/);
  if (parts.length === 3) {
    // handle DD/MM/YYYY or YYYY-MM-DD
    if (parts[0].length === 4) {
      // YYYY-MM-DD -> convert
      document.getElementById('deadlineDay').value = parts[2];
      document.getElementById('deadlineMonth').value = parts[1];
      document.getElementById('deadlineYear').value = parts[0];
    } else {
      document.getElementById('deadlineDay').value = parts[0];
      document.getElementById('deadlineMonth').value = parts[1];
      document.getElementById('deadlineYear').value = parts[2];
    }
  } else {
    document.getElementById('deadlineDay').value = '';
    document.getElementById('deadlineMonth').value = '';
    document.getElementById('deadlineYear').value = '';
  }

  let idField = document.getElementById('taskId');
  if (!idField) {
    idField = document.createElement('input');
    idField.type = 'hidden';
    idField.id = 'taskId';
    form.appendChild(idField);
  }
  idField.value = t.id;
  form.querySelector('button[type=submit]').textContent = '💾 Simpan Perubahan';
}

search.addEventListener('input', renderTasks);
statusFilter.addEventListener('change', renderTasks);
courseFilter.addEventListener('change', renderTasks);

renderTasks();
