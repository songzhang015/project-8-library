/* JS File for Library Project */

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function removeBook(id) {
    // for (let i = 0; i < myLibrary.length; i++) {
    //     if (myLibrary[i].id == id) {
    //         myLibrary.splice(i, 1);
    //         break;
    //     }
    // }

    myLibrary = myLibrary.filter(book => book.id !== id);

    displayLibrary();
}

function displayLibrary() {
    const table = document.querySelector(".library-body");
    table.innerHTML = "";
    myLibrary.forEach(book => {
        // Create a row and append columns for each table field
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        row.appendChild(titleCell);

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;
        row.appendChild(pagesCell);

        // Make the status of the book a checkbox which updates the library
        const readCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = book.read;

        checkbox.addEventListener("change", () => {
            book.toggleReadStatus();
        });
        readCell.appendChild(checkbox);
        row.appendChild(readCell);

        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "icons/delete.svg";
        deleteBtn.appendChild(deleteIcon);

        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            removeBook(book.id);
        });
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        table.appendChild(row);
    });
}

// Add Book Modal
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const submitButton = document.querySelector(".submit-btn");
const addBookForm = document.querySelector("#addBookForm");
const closeButton = document.querySelector(".exit-btn");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Submit" button submits the dialog info
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputName = document.querySelector(".name").value;
    const inputAuthor = document.querySelector(".author").value;
    const inputPages = document.querySelector(".pages").value;
    addBookToLibrary(inputName, inputAuthor, inputPages, false);
    displayLibrary();
    dialog.close();
    addBookForm.reset();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
    addBookForm.reset();
});

addBookToLibrary("Book 1", "Author 1", 100, false);

displayLibrary();