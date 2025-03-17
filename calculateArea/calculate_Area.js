let length;
let width;

function calculateArea() {
 length = parseFloat(document.getElementById('length').value);
 width = parseFloat(document.getElementById('width').value);
 
 let area = length * width;
 
  document.getElementById('result').innerText = `The area of the rectangle is: ${area}`;
}


/*
- document.getElementById ('length'): This part of the code retrieves an HTML element by its ID, specifically searching for an element with the ID 'length'.
- .value: After accessing the HTML element, .value is used to retrieve the value entered into the input field associated with that element. 
For instance, if a user enters '5' into the input field for length, .value retrieves the string '5'.
- parseFloat(…): The parseFloat() function converts the string value retrieved from the input field to a floating-point number. 
This conversion ensures that the input, typically text entered by the user, is treated as a number and can be used in mathematical operations.
- length and width: Finally, the obtained floating-point numbers (representing the length and width values entered by the user) are stored in the variables length and width, respectively. 
These variables will be utilized for further calculations, such as determining the area of a rectangle in this context.
- document.getElementById ('result'): This part of the code retrieves an HTML element by its ID. Specifically, it targets an element with the ID 'result'.
- .innerText = The area of the rectangle is: ${area};: Once the element is accessed, .innerText is used to modify the text content within that HTML element.
- The backticks and ${} notation allow for the inclusion of JavaScript variables within a string (using template literals). 
In this case, it sets the text content to display a message along with the calculated area stored in the variable area. 
For example, if area holds a value of 25, the text displayed will be "The area of the rectangle is: 25".

*/