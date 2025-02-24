const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load saved notes on page load
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; 
}
showNotes();

// Save notes to localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "./images/delete-icon.png";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    updateStorage(); // **Fix: Save new notes to localStorage**
});

// Event delegation for delete and update functionality
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        document.querySelectorAll(".input-box").forEach(note => {
            note.onkeyup = updateStorage; // Fix: Directly attach updateStorage
        });
    }
});

// Prevent "Enter" key from creating a new paragraph
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
