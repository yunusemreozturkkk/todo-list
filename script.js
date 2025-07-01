let currentFilter = "all";

const quotes = [
  "“Büyük işler, küçük adımlarla başlar.”",
  "“Bugün yapabildiğin en iyi şey, dündür öğrenip yarına hazırlanmaktır.”",
  "“Hayallerin seni korkutmuyorsa, yeterince büyük değillerdir.”",
  "“Yolda olmak, varmaktan güzeldir bazen.”",
  "“Kendine inandığın an her şey değişir.”"
];

const emojiList = ["😀", "😂", "😉", "😍", "🤔", "😎", "👍", "🎉", "🔥", "🚀"];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");
const taskList = document.getElementById("taskList");
const quoteBox = document.getElementById("quoteBox");

function showRandomQuote() {
  const idx = Math.floor(Math.random() * quotes.length);
  quoteBox.textContent = quotes[idx];
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "list-group-item";

  li.innerHTML = `
    <div>
      <input type="checkbox" onchange="toggleDone(this)" />
      <span>${text}</span>
    </div>
    <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Sil</button>
  `;

  taskList.appendChild(li);
  taskInput.value = "";
  filterTasks(currentFilter);
  hideEmojiPicker();
}

function toggleDone(checkbox) {
  const span = checkbox.nextElementSibling;
  if (checkbox.checked) span.classList.add("done");
  else span.classList.remove("done");
  filterTasks(currentFilter);
}

function deleteTask(button) {
  button.parentElement.remove();
}

function filterTasks(type) {
  currentFilter = type;
  const tasks = taskList.querySelectorAll("li");
  tasks.forEach(task => {
    const checked = task.querySelector("input[type=checkbox]").checked;
    if (type === "all") task.style.display = "flex";
    else if (type === "active") task.style.display = checked ? "none" : "flex";
    else if (type === "completed") task.style.display = checked ? "flex" : "none";
  });
}

function toggleEmojiPicker() {
  emojiPicker.classList.toggle("d-none");
  if (!emojiPicker.classList.contains("d-none")) positionEmojiPicker();
}

function hideEmojiPicker() {
  emojiPicker.classList.add("d-none");
}

function positionEmojiPicker() {
  const rect = emojiBtn.getBoundingClientRect();
  emojiPicker.style.top = rect.bottom + window.scrollY + "px";
  emojiPicker.style.left = rect.left + window.scrollX + "px";
}

function populateEmojiPicker() {
  emojiPicker.innerHTML = "";
  emojiList.forEach(emoji => {
    const span = document.createElement("span");
    span.textContent = emoji;
    span.onclick = () => {
      taskInput.value += emoji;
      taskInput.focus();
      hideEmojiPicker();
    };
    emojiPicker.appendChild(span);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateEmojiPicker();
  showRandomQuote();

  addBtn.addEventListener("click", addTask);

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  emojiBtn.addEventListener("click", toggleEmojiPicker);

  document.getElementById("filterAll").addEventListener("click", () => filterTasks("all"));
  document.getElementById("filterActive").addEventListener("click", () => filterTasks("active"));
  document.getElementById("filterCompleted").addEventListener("click", () => filterTasks("completed"));

  filterTasks("all");
});
