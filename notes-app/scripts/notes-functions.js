// Read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON): []
    }catch (e){
        return []
    }
    
}



// Save the notes to localStorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}


//Remove a note
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id
    })
    if(noteIndex > -1){
        notes.splice(noteIndex,1)
    }
}




// Generate the DOM structure for a note
const generateNoteDOM = function (note) {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup Link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')


    //Status message
    statusEl.textContent = refreshUpdated(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

//Sor the notes by one of three ways
const sortNotes = function (notes, sortBy){
    if(sortBy === 'byEdited'){
        return notes.sort(function (a,b){
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else{
        return notes
    }
}

// Render application notes
const renderNotes = function (notes, filters) {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesEl.innerHTML = ''

    if(filteredNotes.length > 0){
        filteredNotes.forEach(function (note) {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        notesEl.appendChild(emptyMessage)
    }

    
}

const refreshUpdated = (timestamp) =>{
    return `Last Edited ${moment(timestamp).fromNow()}`

}