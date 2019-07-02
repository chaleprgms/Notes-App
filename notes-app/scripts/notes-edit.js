'use strict'

let titleElement = document.querySelector('#note-title')
let bodyElement = document.querySelector('#note-body')
let removeElement = document.querySelector('#remove-note')
let dateElement = document.querySelector('#last-edited')
let noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = refreshUpdated(notes.updatedAt)

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = refreshUpdated(notes.updatedAt)
    saveNotes(notes)
})


bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = refreshUpdated(notes.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteId)

        if (note === undefined) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = refreshUpdated(notes.updatedAt)
    }
})