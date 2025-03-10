// elements' declaration
const form = document.querySelector('form');
const noteInput = document.querySelector('#note-input');
const deleteAllNotesBtn = document.querySelector('#delete-all-notes-btn');
const notesList = document.querySelector('.notes-list');

let notesDB = JSON.parse(localStorage.getItem('notesDB')) || [];


// DOM
renderAllNotes();

form.onsubmit = (e) => {
    e.preventDefault();

    noteInput.value.trim() === '' ? null : createNewNote();
    noteInput.value = '';
}

deleteAllNotesBtn.onclick = () => {
    notesList.innerHTML = '';
    updateDB();
}

notesList.addEventListener('click', (e) => {
    if (e.target.closest('.delete-note-btn')) {
        e.target.closest('li').remove()
        updateDB();
    }
});


// functions
function renderAllNotes() {
    notesList.innerHTML = '';
    notesDB.forEach(note => {
        renderNote(note);
    });
}

function renderNote(noteText = '[empty param value]') {
    const note = document.createElement('li');
    const noteParagraph = document.createElement('p');
    const deleteNoteBtn = document.createElement('button');
    const deleteNoteIcon = document.createElement('img');

    deleteNoteIcon.src = 'img/trash.svg';
    
    deleteNoteBtn.classList.add('delete-note-btn');
    deleteNoteBtn.appendChild(deleteNoteIcon);

    noteParagraph.innerText = noteText;
    noteParagraph.setAttribute('contenteditable', 'true');
    noteParagraph.classList.add('note-paragraph');

    note.appendChild(noteParagraph);
    note.appendChild(deleteNoteBtn);
    notesList.appendChild(note);
}

function createNewNote() {
    renderNote(noteInput.value);
    updateDB();
}

function updateDB() {
    notesDB = [];
    let notesDBItems = document.querySelectorAll('.notes-list .note-paragraph');
    notesDBItems.forEach(note => {
        notesDB.push(note.innerText);
    });
    localStorage.setItem('notesDB', JSON.stringify(notesDB));
}
