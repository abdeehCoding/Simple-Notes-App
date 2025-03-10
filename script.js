// elements' declaration
const form = document.querySelector('form');
const noteInput = document.querySelector('#note-input');
const deleteNotesBtn = document.querySelector('#delete-notes-btn');
const notesList = document.querySelector('.notes-list');

let notes = JSON.parse(localStorage.getItem('notes')) || [];


// DOM's logic
renderAllNotes();

form.onsubmit = (e) => {
    e.preventDefault();
    noteInput.value.trim() === '' ? null : newNote(); 
}

notesList.addEventListener('click', (e) => {
    if (e.target.closest('.delete-current-note-btn')) {
        e.target.closest('.note-item').remove();

        updateNotesDB();
    }
});

deleteNotesBtn.onclick = () => {
    deleteNotes();
}


// functions
function renderAllNotes() {
    notesList.innerHTML = null;
    notes.forEach(note => {
        renderNoteToDOM(note);
    });
}

function newNote() {
    renderNoteToDOM(noteInput.value);

    updateNotesDB();

    noteInput.value = '';
}

function updateNotesDB() {
    notes = [];
    document.querySelectorAll('.notes-list p[contenteditable="true"]').forEach(note => {
        notes.push(note.textContent);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNoteToDOM(noteText = '') {
    const note = document.createElement('li');
    const noteTextContainer = document.createElement('p');
    const deleteCurrentNoteBtn = document.createElement('button');
    const deleteNoteIcon = document.createElement('img');

    deleteNoteIcon.src = "img/trash.svg";

    deleteCurrentNoteBtn.classList.add('delete-current-note-btn');
    deleteCurrentNoteBtn.appendChild(deleteNoteIcon);

    noteTextContainer.setAttribute('contenteditable', true);
    noteTextContainer.innerText = noteText;

    note.classList.add('note-item');
    note.appendChild(noteTextContainer);
    note.appendChild(deleteCurrentNoteBtn);

    notesList.appendChild(note);
}

function deleteNotes() {
    notesList.innerHTML = '';
    notes = [];
    updateNotesDB();
}
