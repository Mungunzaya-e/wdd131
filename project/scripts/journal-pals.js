document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.querySelector("#currentyear");
    const lastModifiedElement = document.querySelector("#lastModified");

    const date = new Date();
    currentYearElement.textContent = date.getFullYear();

    if (document.lastModified) {
        const modifiedDate = new Date(document.lastModified).toLocaleString();
        lastModifiedElement.textContent = "Last Modified: " + modifiedDate;
    }
});

const mainNav = document.querySelector(".navigation")
const hamButton = document.querySelector("#menu")

hamButton.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    hamButton.classList.toggle("show");
})

window.onload = function() {
  loadEntries();
  
};

loadListEntries();

function saveListEntry() {
  const textarea = document.getElementById('listEntry');
  const entryText = textarea.value.trim();

  const textTitle = document.getElementById('listTitle');
  const titleText = textTitle.value.trim();

  if (entryText === '') return;

  const timestamp = new Date().toLocaleString();

  // Create entry object
  const entry = {
    title: titleText,
    text: entryText,
    time: timestamp
  };

  // Get existing entries or initialize empty array
  const entries = JSON.parse(localStorage.getItem('listEntry')) || [];
  entries.unshift(entry); // add newest on top

  // Save back to localStorage
  localStorage.setItem('listEntry', JSON.stringify(entries));

  // Clear textarea
  textarea.value = '';

  // Reload entries
  loadListEntries();
}

function saveEntry() {
  const textarea = document.getElementById('journalEntry');
  const entryText = textarea.value.trim();

  if (entryText === '') return;

  const timestamp = new Date().toLocaleString();

  // Create entry object
  const entry = {
    text: entryText,
    time: timestamp
  };

  // Get existing entries or initialize empty array
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entries.unshift(entry); // add newest on top

  // Save back to localStorage
  localStorage.setItem('journalEntries', JSON.stringify(entries));

  // Clear textarea
  textarea.value = '';

  // Reload entries
  loadEntries();
}

function loadEntries() {
  const entriesContainer = document.getElementById('entriesContainer');
  entriesContainer.innerHTML = '';

  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

  entries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `<strong>${entry.time}</strong><p>${entry.text}</p>`;
    entriesContainer.appendChild(div);
  });
}

function loadListEntries() {
  const entriesContainer = document.getElementById('listEntriesContainer');
  entriesContainer.innerHTML = '';

  const entries = JSON.parse(localStorage.getItem('listEntry')) || [];

  entries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.style.border = '1px solid #ccc';
    div.style.padding = '10px 2em';
    div.style.marginBottom = '10px';
    div.style.borderRadius = '8px';
    div.style.width = "80vw";
    div.style.margin = "auto";
    div.style.boxSizing = "border-box";

    div.innerHTML = `
      <h4>${entry.title}</h4>
      <small>${entry.time}</small>
      <p>${entry.text}</p>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = '#791b18ff';
    deleteBtn.style.color = '#fff';
    deleteBtn.style.border = 'none';
    deleteBtn.style.padding = '6px 12px';
    deleteBtn.style.borderRadius = '5px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.marginTop = '5px';

    // Attach delete functionality
    deleteBtn.onclick = () => deleteEntry(index);

    div.appendChild(deleteBtn);
    entriesContainer.appendChild(div);
  });
}

function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('listEntry')) || [];
  entries.splice(index, 1); // Remove the item at the given index
  localStorage.setItem('listEntry', JSON.stringify(entries));
  loadListEntries(); // Reload updated list
}

function openTrackBox(habitName) {
  const container = document.getElementsByClassName("tracker-container")[0];

  // Prevent duplicate tracker for the same habit
  if (document.getElementById(`${habitName}-input`)) return;

  const trackBox = document.createElement("div");
  trackBox.style.padding = "15px";
  trackBox.style.background = "#eadcd3ff";
  trackBox.style.borderRadius = "15px";
  trackBox.style.width = "80vw";
  trackBox.style.margin = "20px auto";

  const label = document.createElement("label");
  label.textContent = getLabelText(habitName);
  label.htmlFor = `${habitName}-input`;

  const input = document.createElement("input");
  input.type = "number";
  input.id = `${habitName}-input`;
  input.style.width = "50px";
  input.style.border = 0;
  input.style.padding = "5px";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.style.display = "inline";
  saveButton.style.backgroundColor = "#896b53";
  saveButton.style.width = "80px";
  saveButton.style.height = "40px";
  saveButton.style.borderRadius = "10px";
  saveButton.style.fontSize = "16px";
  saveButton.style.marginLeft = "7em";
  saveButton.style.marginTop = "1em";
  saveButton.style.cursor = "pointer";

  const logTitle = document.createElement("h3");
  logTitle.textContent = `${habitName} Log`;

  const logList = document.createElement("ul");
  logList.id = `${habitName}-log`;
  logList.style.listStyle = "none";
  logList.style.paddingLeft = "0";

  // Save button logic
  saveButton.onclick = function () {
    const value = parseInt(input.value);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid number.");
      return;
    }

    const now = new Date();
    const entry = {
      value: value,
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString()
    };

    const storageKey = `${habitName}-log-data`;
    const savedData = JSON.parse(localStorage.getItem(storageKey) || "[]");
    savedData.push(entry);
    localStorage.setItem(storageKey, JSON.stringify(savedData));

    addLogEntryToDOM(entry, logList, habitName);
    input.value = '';
  };

  trackBox.appendChild(label);
  trackBox.appendChild(input);
  trackBox.appendChild(saveButton);
  trackBox.appendChild(logTitle);
  trackBox.appendChild(logList);

  container.appendChild(trackBox);

  // Load saved logs
  const savedData = JSON.parse(localStorage.getItem(`${habitName}-log-data`) || "[]");
  savedData.forEach(entry => addLogEntryToDOM(entry, logList, habitName));
}

function addLogEntryToDOM(entry, logList, habitName) {
  const li = document.createElement("li");
  li.textContent = `${entry.date} at ${entry.time}: ${entry.value} ${getUnit(habitName)}`;
  li.style.padding = "5px 0";
  logList.appendChild(li);
}

// Optional: customize label text per habit
function getLabelText(habitName) {
  switch (habitName) {
    case "Water Intake":
      return "Number of cups: ";
    case "Study":
      return "Study time (hours): ";
    case "Reading":
      return "Pages read: ";
    case "Work-Out":
      return "Workout time (minutes): ";
    default:
      return "Enter value: ";
  }
}

// Optional: customize units for logs
function getUnit(habitName) {
  switch (habitName) {
    case "Water Intake":
      return "cup(s)";
    case "Study":
      return "hour(s)";
    case "Reading":
      return "page(s)";
    case "Work-Out":
      return "minute(s)";
    default:
      return "unit(s)";
  }
}

function promptCustomHabit() {
  const customHabit = prompt("Enter the name of your custom habit:");
  if (!customHabit) return;

  // Capitalize first letter
  const habitName = customHabit.trim().charAt(0).toUpperCase() + customHabit.trim().slice(1);

  openTrackBox(habitName);
}
