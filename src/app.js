import './script/components/index.js'
// import './script/view/newData.js'
import home from './script/view/home.js';

document.addEventListener('DOMContentLoaded', () => {
  home();
  loadNotes();
  setFormListener();

  // Tahun realtime footer
  const currentYearElement = document.getElementById('currentYear');
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;
});

// Validasi Form custom
const form = document.querySelector('.notes-form');
const titleInput = form.elements.noteTitle;
const descInput = form.elements.noteDesc;

form.addEventListener('submit', (e) => e.preventDefault());

titleInput.addEventListener('invalid', (e) => {
  e.target.setCustomValidity('');

  if (!e.target.validity.valid) {
    e.target.setCustomValidity('Wajib diisi.');
    return;
  };
});

descInput.addEventListener('invalid', (e) => {
  e.target.setCustomValidity('');

  if (!e.target.validity.valid) {
    e.target.setCustomValidity('Wajib diisi.');
    return;
  };
});


// ===================== Add Note to Local Storage ==========================

function setFormListener() {
  const notesForm = document.getElementById('notesForm');

  notesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const noteTitle = document.getElementById('noteTitle').value;
    const noteDesc = document.getElementById('noteDesc').value;

    const note = {
      id: generateUniqueId(),
      title: noteTitle,
      body: noteDesc,
      createdAt: new Date().toISOString(),
      archived: false,
    }

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes))

    this.reset();

    loadNotes();
  });
}

function generateUniqueId() {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2, 8);

  return `notes-${timestamp}-${randomString}`;
}

function loadNotes() {
  const noteListElement = document.querySelector('note-list');

  // noteListElement.innerHTML = '';

  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.forEach(note => {
    const noteItemElement = document.createElement('note-item');
    noteItemElement.note = note;
    noteListElement.append(noteItemElement);
  });
}


/* Reload browser ketika button diclick, agar data di local storage
langsung muncul :) */

const saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', function() {
  location.reload();
});