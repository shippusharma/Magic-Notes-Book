console.log("created by 'Shippu Sharma'");
showNotes();

// if user add a note , add it to the localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
})

// Function to Show element from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {

        html += `
                <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>                
                `;
    });
    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    }
    else {
        notesElement.innerHTML = ` NoteBooks is Empty`;
    }
}

// Function to Delete a Note
function deleteNote(index) {
    // console.log("I am Deleting a Note", index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes()
}

// for Search Button
let Search = document.getElementById('searchTxt');
Search.addEventListener("input", function (element) {

    let inputVal = Search.value.toLowerCase();
    // console.log("input Event Fired....!",inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})



