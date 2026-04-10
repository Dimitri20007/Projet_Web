/**
 * Gestionnaire de Tâches – Logique JavaScript
 * Projet Web – Partie 2
 */

"use strict";

/* =============================================
   Données
   ============================================= */

const STORAGE_KEY = "tasks_p2";

/**
 * Charge les tâches depuis le localStorage.
 * @returns {Array} tableau de tâches
 */
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Sauvegarde les tâches dans le localStorage.
 * @param {Array} tasks
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* =============================================
   Sélecteurs DOM
   ============================================= */

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const statsText = document.getElementById("stats-text");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

/* =============================================
   État de l'application
   ============================================= */

let tasks = loadTasks();
let currentFilter = "all";

/* =============================================
   Rendu
   ============================================= */

/**
 * Formate une date ISO en chaîne lisible (fr).
 * @param {string} iso
 * @returns {string}
 */
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Filtre les tâches selon le filtre courant.
 * @returns {Array}
 */
function getFilteredTasks() {
  switch (currentFilter) {
    case "pending":
      return tasks.filter((t) => !t.completed);
    case "completed":
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
}

/**
 * Met à jour le compteur de tâches.
 */
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  statsText.textContent = `${total} tâche${total !== 1 ? "s" : ""} (${done} terminée${done !== 1 ? "s" : ""})`;
}

/**
 * Crée un élément <li> pour une tâche.
 * @param {Object} task
 * @returns {HTMLElement}
 */
function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  if (task.completed) li.classList.add("completed");
  li.dataset.id = task.id;

  // Indicateur de priorité
  const dot = document.createElement("span");
  dot.classList.add("priority-dot", task.priority);
  dot.title = `Priorité : ${task.priority}`;

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-check");
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Marquer "${task.text}" comme terminée`);
  checkbox.addEventListener("change", () => toggleTask(task.id));

  // Texte
  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = task.text;

  // Date
  const meta = document.createElement("span");
  meta.classList.add("task-meta");
  meta.textContent = formatDate(task.createdAt);

  // Bouton supprimer
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "✕";
  deleteBtn.title = "Supprimer";
  deleteBtn.setAttribute("aria-label", `Supprimer "${task.text}"`);
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  li.append(dot, checkbox, span, meta, deleteBtn);
  return li;
}

/**
 * Re-rend la liste des tâches.
 */
function render() {
  const filtered = getFilteredTasks();

  // Vider la liste
  taskList.innerHTML = "";

  if (filtered.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
    filtered.forEach((task) => {
      taskList.appendChild(createTaskElement(task));
    });
  }

  updateStats();
}

/* =============================================
   Actions
   ============================================= */

/**
 * Ajoute une nouvelle tâche.
 * @param {string} text
 * @param {string} priority
 */
function addTask(text, priority) {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const task = {
    id,
    text: text.trim(),
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.unshift(task);
  saveTasks(tasks);
  render();
}

/**
 * Bascule l'état complété d'une tâche.
 * @param {string} id
 */
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    render();
  }
}

/**
 * Supprime une tâche.
 * @param {string} id
 */
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks(tasks);
  render();
}

/**
 * Supprime toutes les tâches terminées.
 */
function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks(tasks);
  render();
}

/* =============================================
   Événements
   ============================================= */

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text, prioritySelect.value);
  taskForm.reset();
  prioritySelect.value = "medium";
  taskInput.focus();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

/* =============================================
   Initialisation
   ============================================= */

render();
