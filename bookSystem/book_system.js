let books = [];

/*
- Data collection and validation: 
The function retrieves the values entered by the user in the HTML input fields for book name, author name, book description, and number of pages. 
It uses document.getElementById('elementId').value to access these values. 
The code then checks if all fields have been filled (bookName, authorName, bookDescription) and ensures that pagesNumber is a valid number (using !isNaN(pagesNumber)). 
If any field is empty or if pagesNumber is not a valid number, an alert prompts the user to fill in all fields correctly.
- Creating a book object: Upon successful validation, the function creates a book object containing properties such as name, authorName, bookDescription, and pagesNumber, storing the user-entered data. 
This book object is then pushed into the books array, effectively adding the new book to the collection.
- Display and clear: After adding the book, the showbooks() function is called to update the display with the newly added book details. 
Additionally, the clearInputs() function is invoked to reset all input fields, providing a clean interface for the user to add another book without manual clearing of previous inputs.
*/

function addBook() {
		const bookName = document.getElementById('bookName').value;
		const authorName = document.getElementById('authorName').value;
		const bookDescription = document.getElementById('bookDescription').value;
		const pagesNumber = parseInt(document.getElementById('pagesNumber').value);
		if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
			const book = {
				name: bookName,
				authorName: authorName,
				bookDescription: bookDescription,
				pagesNumber: pagesNumber
			};
			books.push(book);
			showbooks();
			clearInputs();
		} else {
			alert('Please fill in all fields correctly.');
		}
	}

/*
- The map() function iterates through the books array, creating a new array of HTML elements or strings based on the book information present in each array element.
- Generating book information:
        For each book in the books array, it creates a structured HTML representation.
        It constructs an HTML string that includes:
        A heading displaying the book number <h1>book Number: ${index + 1}</h1>.
        Paragraphs <p> containing details about the book such as name, author name, book description, and the number of pages.
        Two buttons, one for editing <button onclick="editbook(${index})">Edit</button> and another for deleting <button onclick="deletebook(${index})">Delete</button> a specific book. 
		These buttons are configured to call the editbook() and deletebook() functions respectively, passing the index of the book as a parameter.
- The join('') method is employed to concatenate all the HTML elements generated for each book into a single string. 
This string representation of HTML elements allows the content to be inserted as a single block of HTML.
- The innerHTML property of the HTML element with the ID 'books' is then set to the generated HTML string (booksDiv). 
This action replaces the existing content within the 'books' element with the newly created HTML structure representing the books.

*/

function showbooks() {
    const booksDiv = books.map((book, index) => `<h1>book Number: ${index + 1}</h1>
        <p><strong>Book Name: </strong>${book.name}</p>
        <p><strong>Author Name:</strong> ${book.authorName}</p>
        <p><strong>Book Description:</strong> ${book.bookDescription}</p>
        <p><strong>No. of Pages:</strong> ${book.pagesNumber} page(s)</p>`
    );
    document.getElementById('books').innerHTML = booksDiv.join('');
}

/*
Create a clearInputs function to clear the book details in the management system.
For this include given code in the book_system.js file after the previous code.
Below code clears the book details by assigning empty value to HTML element using ID's.
*/

 function clearInputs() {
            document.getElementById('bookName').value = '';
            document.getElementById('authorName').value = '';
            document.getElementById('bookDescription').value = '';
            document.getElementById('pagesNumber').value = '';
 }