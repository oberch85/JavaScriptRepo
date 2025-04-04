/*
Define variables.
- addPatientButton: The button used to add patient data
- report: The HTML element where you will see analysis reports displayed
- btnSearch: The variable name of the button which displays the search results when clicked
- An empty array named patients is also created to store the collected patient data.
*/
const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

/*
Creating the function that adds the patient details.
This function captures user-entered data from the HTML form elements: name, gender, age, and medical condition. 
It ensures that all fields have valid inputs.
This function retrieves the patient's details in the form such as name, gender, age, and condition. For example, the variable name is defined by
const name = document.getElementById("name").value;
Additionally, it:
- appends the patient's details to the patients[] array, which stores all entered patient data using the push() method
- resets the form fields using the resetForm() method to clear the input fields for the next entry
- triggers the generateReport() method to update and display the analysis report based on the newly added patient data
*/
function addPatient() {
  const name = document.getElementById("name").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const age = document.getElementById("age").value;
  const condition = document.getElementById("condition").value;

  if (name && gender && age && condition) {
	patients.push({ name, gender: gender.value, age, condition });
	resetForm();
	generateReport();
  }
}

/*
Create a function to reset form values --> Create a function named resetForm(). 
This function clears the values of the name, gender, age, and condition fields in the HTML form by setting them to empty strings or unchecked for radio buttons, 
effectively resetting the form to its initial state. Hence it is ready for new data entry.
The  code assigns an empty value to all the fields to clear previously entered details.
*/
function resetForm() {
  document.getElementById("name").value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
  document.getElementById("age").value = "";
  document.getElementById("condition").value = "";
}

/*
Create the function that generates the report
This generateReport() function calculates and constructs an analysis report based on the collected patient data stored in the patients[] array. Here's a breakdown:
    Initialization:
        numPatients Represents the total number of patients stored in the patients[] array
        conditionsCount A data structure (object) initializing counters for specific medical conditions (Diabetes, Thyroid, High Blood Pressure), initially set to zero.
        genderConditionsCount A nested object with gender-specific condition counters ( male and female) for each medical condition, also initialized to zero for each condition
    Data processing loop:
        Iterates through the patients[] array: Utilizes a for…of loop to iterate through each patient's data within the patients[] array
        Increment condition counts: Increments the count for each patient's specific medical condition in the conditionsCount object.
        Updating gender-based condition counts: Increases the count of each medical condition within the respective gender category in the genderConditionsCount object based on the patient's gender and condition
    HTML update:
        Update report element: Dynamically updates the HTML content within the designated report element
        Total patients display: Displays the total number of patients
        Conditions breakdown: Lists the counts for each medical condition in the conditionsCount object
        Gender-based conditions display: Illustrates counts of each condition categorized by gender in the genderConditionsCount object, showing the distribution of conditions among males and females separately.
    Event Listener
        Now, you need to set up event listener using addPatientButton.addEventListener("click", addPatient) to add patient details when the user clicks the Add Patient button.
*/
function generateReport() {
	  const numPatients = patients.length;
	  const conditionsCount = {
		Diabetes: 0,
		Thyroid: 0,
		"High Blood Pressure": 0,
	  };
	  const genderConditionsCount = {
		Male: {
		  Diabetes: 0,
		  Thyroid: 0,
		  "High Blood Pressure": 0,
		},
		Female: {
		  Diabetes: 0,
		  Thyroid: 0,
		  "High Blood Pressure": 0,
		},
	  };

	  for (const patient of patients) {
		conditionsCount[patient.condition]++;
		genderConditionsCount[patient.gender][patient.condition]++;
	  }

	  report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
	  report.innerHTML += `Conditions Breakdown:<br>`;
	  for (const condition in conditionsCount) {
		report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
	  }

	  report.innerHTML += `<br>Gender-Based Conditions:<br>`;
	  for (const gender in genderConditionsCount) {
		report.innerHTML += `${gender}:<br>`;
		for (const condition in genderConditionsCount[gender]) {
		  report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
		}
	  }
	}

addPatientButton.addEventListener("click", addPatient);

/*
Create a function for search request
This JavaScript function searchCondition() is designed to work within a web page to retrieve health condition information based on user input. 
This function fetches the health condition data from the health.json file and searches for a matching condition based on user input. Then, it displays the condition details or an error message in a designated HTML element (resultDiv).
The above code includes:
    const input = document.getElementById('conditionInput').value.toLowerCase(); This retrieves the value entered into the input field with the ID conditionInput. It converts the entered text to lowercase to ensure case-insensitive comparison.
    const resultDiv = document.getElementById('result'); resultDiv.innerHTML = ''; This retrieves the HTML element with the ID 'result'. It clears any previous content within this HTML element.
    fetch('health.json') This API method initiates a fetch request to the file named 'health.json'. It assumes a JSON file named 'health.json' is in the same directory as the HTML file.
    .then(response => response.json()) Converts the fetched response into JSON format.
    .then(data => {  ...  }) This handles the retrieved JSON data. It searches for a health condition that matches the user input.
    const condition = data.conditions.find(item => item.name.toLowerCase() === input); This searches within the JSON data for a health condition whose name matches the entered input.
    if (condition) {  ... } else {  ...  } This code checks for a matching condition. If found, it constructs HTML content to display details about the condition (name, symptoms, prevention, treatment) within the resultDiv. If the system cannot find a matching condition, it displays a 'Condition not found' message within the resultDiv.
    .catch(error => {  ...  }) This handles any errors that might occur during the fetch request or data processing. If an error occurs, it logs it to the console and displays an error message within the resultDiv.
*/
function searchCondition() {
const input = document.getElementById('conditionInput').value.toLowerCase();
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = '';

fetch('health_analysis.json')
  .then(response => response.json())
  .then(data => {
	const condition = data.conditions.find(item => item.name.toLowerCase() === input);

	if (condition) {
	  const symptoms = condition.symptoms.join(', ');
	  const prevention = condition.prevention.join(', ');
	  const treatment = condition.treatment;

	  resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
	  resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

	  resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
	  resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
	  resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
	} else {
	  resultDiv.innerHTML = 'Condition not found.';
	}
  })
  .catch(error => {
	console.error('Error:', error);
	resultDiv.innerHTML = 'An error occurred while fetching data.';
  });
}
btnSearch.addEventListener('click', searchCondition);