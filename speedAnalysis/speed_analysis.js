let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
// Set the test text
document.getElementById("inputText").value = testText;

// Reset results and timer
document.getElementById("output").innerHTML = "";
startTime = new Date().getTime();

// Change button text and functionality
var button = document.getElementById("btn");
button.innerHTML = "End Test";
button.onclick = endTest;
        }

/*
- It accesses the text area element in the HTML document using the ID inputText. This sets the value of the inputText text area to a variable or value named testText.
- Additionally, the function clears existing content within two specific HTML elements with ID output and timer. 
These elements serve the purpose of displaying test results and the timer during the assessment. 
Resetting their innerHTML to an empty string prepares the space to showcase fresh results and ensures the timer starts from zero when the test commences.
- Moreover, the startTest() function handles the initialization of time tracking. 
It captures the current timestamp using the new Date().getTime() and stores it as the startTime variable, signaling the beginning of the test.
- The script utilizes a variable linked to an HTML element identified by the ID button. Upon the page load, the button displays the Start Test text. 
However, once the user initiates the test by clicking the button, it dynamically switches to display the End Test. 
Simultaneously, this action invokes the execution of the endTest() function, 
seamlessly enabling the transition between initiating and concluding the test through a single button click.
*/

 function endTest() {
            endTime = new Date().getTime();

            // Disable user input
            document.getElementById("userInput").readOnly = true;

            // Calculate time elapsed and words per minute (WPM)
            var timeElapsed = (endTime - startTime) / 1000; // in seconds
            var userTypedText = document.getElementById("userInput").value;

            // Split the text using regex to count words correctly
            var typedWords = userTypedText.split(/\s+/).filter(function (word) {
                return word !== "";
            }).length;

            var wpm = 0; // Default value

            if (timeElapsed !== 0 && !isNaN(typedWords)) {
                wpm = Math.round((typedWords / timeElapsed) * 60);
            }

            // Display the results
            var outputDiv = document.getElementById("output");
            outputDiv.innerHTML = "<h2>Typing Test Results:</h2>" +
                "<p>Words Typed: " + typedWords + "</p>" +
                "<p>Time Elapsed: " + timeElapsed.toFixed(2) + " seconds</p>" +
                "<p>Words Per Minute (WPM): " + wpm + "</p>";

            // Reset the button
            var button = document.getElementById("btn");
            button.innerHTML = "Start Test";
            button.onclick = startTest;
        }

/*
 Here is the breakdown of above code:
- endTime = new Date().getTime();: This line captures the current time when the test ends.
- document.getElementById("userInput").readOnly = true;: Disables further input in the userInput textarea, preventing the user from typing after the test is complete.

Time calculation:
    var timeElapsed = (endTime - startTime) / 1000;
        endTime captures the current timestamp using new Date().getTime() to mark the test's conclusion.
        startTime holds the presumably set the starting time when the test began.
        timeElapsed is calculated by subtracting startTime from endTime to get the time duration in milliseconds and then converts it to seconds by dividing by 1000.

Calculating words per minute (WPM):
    var userTypedText = document.getElementById("userInput").value; var typedWords = userTypedText.split(/\s+/).filter(function (word) { return word !== "";}).length;
        The function retrieves the user's typed text from the userInput text area using document.getElementById("userInput").value.
        It then computes the number of words typed by splitting the input text using a regular expression to consider words separated by spaces, tabs, or newlines. 
		Filtering ensures counting valid words, excluding empty strings.

Word Per Minute:
    if (timeElapsed !== 0 && !isNaN(typedWords)) { wpm = Math.round((typedWords / timeElapsed) * 60);}
        Calculates the words per minute. It checks if timeElapsed is not zero and typedWords is a valid number.
        If so, it computes the WPM by dividing the number of typed words by the time elapsed (in minutes) and then multiplies by 60 to get words per minute. 
		Math.round() rounds the value to the nearest whole number.

Displaying test results:
        The function updates the output element's innerHTML to present the test results. 
		It structures the content with an <h2> heading indicating "Typing Test Results" and provides details such as the number of words typed, time elapsed, and words per minute (WPM) achieved during the test.

Resetting button and functionality:
        Resets the button text to “Start Test” and assigns the startTest() function to the click event of the button, allowing the user to start a new typing test.

*/