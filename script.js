/* JS File for Library Project */

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.id = crypto.randomUUID();
	}
	toggleReadStatus() {
		this.read = !this.read;
	}
}

class Library {
	constructor() {
		this.myLibrary = [];
	}

	addBookToLibrary(title, author, pages, read) {
		const newBook = new Book(title, author, pages, read);
		this.myLibrary.push(newBook);
	}

	removeBook(id) {
		// for (let i = 0; i < myLibrary.length; i++) {
		//     if (myLibrary[i].id == id) {
		//         myLibrary.splice(i, 1);
		//         break;
		//     }
		// }

		this.myLibrary = this.myLibrary.filter((book) => book.id !== id);

		this.displayLibrary();
	}

	displayLibrary() {
		const table = document.querySelector(".library-body");
		table.innerHTML = "";
		this.myLibrary.forEach((book) => {
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
				this.removeBook(book.id);
			});
			deleteCell.appendChild(deleteBtn);
			row.appendChild(deleteCell);

			table.appendChild(row);
		});
	}
}

const myLibrary = new Library();

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

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
	dialog.close();
	addBookForm.reset();
});

myLibrary.addBookToLibrary("Book 1", "Author 1", 100, false);
myLibrary.displayLibrary();

function initValidation() {
	const form = document.querySelector("#addBookForm");
	const nameInput = document.querySelector(".name");
	const authorInput = document.querySelector(".author");
	const pagesInput = document.querySelector(".pages");

	form.addEventListener("submit", (e) => {
		if (nameInput.value === "") {
			nameInput.setCustomValidity("Name field cannot be blank.");
			nameInput.reportValidity();
			e.preventDefault();
		} else if (authorInput.value === "") {
			authorInput.setCustomValidity("Author field cannot be blank.");
			authorInput.reportValidity();
			e.preventDefault();
		} else if (pagesInput.value === "") {
			pagesInput.setCustomValidity("Pages field cannot be blank.");
			pagesInput.reportValidity();
			e.preventDefault();
		} else {
			nameInput.setCustomValidity("");
			authorInput.setCustomValidity("");
			pagesInput.setCustomValidity("");

			// "Submit" button submits the dialog info
			e.preventDefault();
			const inputName = document.querySelector(".name").value;
			const inputAuthor = document.querySelector(".author").value;
			const inputPages = document.querySelector(".pages").value;
			myLibrary.addBookToLibrary(inputName, inputAuthor, inputPages, false);
			myLibrary.displayLibrary();
			dialog.close();
			addBookForm.reset();
		}
	});

	nameInput.addEventListener("input", () => {
		nameInput.setCustomValidity("");
	});

	authorInput.addEventListener("input", () => {
		authorInput.setCustomValidity("");
	});

	pagesInput.addEventListener("input", () => {
		pagesInput.setCustomValidity("");
	});
}

initValidation();
