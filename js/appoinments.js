function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-UK', options);
}

// Update the content of the <p> element with the current date
function updateCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        currentDateElement.textContent = getCurrentDate();
    }
}

// Call the function to initially set the current date
updateCurrentDate();

// Get the current date
var currentDate = new Date();

// Function to get abbreviated month name

// Update the container element to use the class name "calendar" instead of the id "calendar"
var calendarEl = document.querySelector('.calendar');

// Initialize FullCalendar with the updated container element
var calendar = new FullCalendar.Calendar(calendarEl, {
    // Customize FullCalendar options as needed
    initialView: 'dayGridMonth', // Display the calendar as a month view,
    // Customize the calendar header
    headerToolbar: {
        left: 'title', // Add the "today" button and navigation buttons
        center: '', // Display the current view title (month name)
        right: 'today prev,next', // Leave the right side of the toolbar empty
    },
    // Callback function to update the caption
    viewDidMount: function (info) {
        document.querySelector('.fc-toolbar-title');
    },
});

calendar.render(); // Render the calendar

const carData = [
    { id: 1, name: "Small Scale" },
    { id: 2, name: "Large Scale" }
   // Add more car data as needed
];

// Function to generate the list of cars and checkboxes
function generateCarList() {
    const carListContainer = document.getElementById('car-list');

    // Clear any existing content
    carListContainer.innerHTML = '';

    // Iterate through the car data and create checkboxes
    carData.forEach((car) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `car-${car.id}`; // Unique ID for each checkbox

        const label = document.createElement('label');
        label.htmlFor = `car-${car.id}`;
        label.textContent = car.name;

        // Create a div to wrap the checkbox and label
        const carItem = document.createElement('div');
        carItem.classList.add('car-item');
        carItem.appendChild(checkbox);
        carItem.appendChild(label);

        // Append the car item to the container
        carListContainer.appendChild(carItem);
    });
}

// Call the function to generate the initial car list
generateCarList();

// Get the table body element
const tableBody = document.querySelector('.daytime-wise-table tbody');

// Define the number of hours (from 0 to 23) and days (7 days)
const numHours = 24;
const numDays = 7;

// Sample array of blocked cells (you can replace this with your actual data)
const blockedCells = [
  { day: 0, hour: 2 },
  { day: 3, hour: 17 },
  { day: 4, hour: 10},
  {day: 7, hour: 20},
  {day: 1,hour: 16}
];

// Function to check if a cell is blocked
function isCellBlocked(day, hour) {
  return blockedCells.some((cell) => cell.day === day && cell.hour === hour);
}

// Loop through hours
for (let hour = 0; hour < numHours; hour++) {
  // Create a new row for each hour
  const newRow = document.createElement('tr');

  // Determine whether it's AM or PM
  const amOrPm = hour < 12 ? 'AM' : 'PM';
  // Calculate the displayed hour (12-hour format)
  const displayedHour = hour % 12 || 12; // If hour is 0, display 12

  // Create the first cell for the hour
  const hourCell = document.createElement('td');
  hourCell.textContent = `${displayedHour.toString().padStart(2, '0')}:00 ${amOrPm}`;
  newRow.appendChild(hourCell);

  // Loop through days
  for (let day = 0; day < numDays; day++) {
    // Create a cell for each day
    const dayCell = document.createElement('td');

    // Check if this cell represents a blocked time
    const isBlocked = isCellBlocked(day, hour);
    
    // If it's a blocked cell, add the 'blocked-cell' class
    if (isBlocked) {
      dayCell.classList.add('blocked-cell');
      dayCell.textContent = "Busy"
      console.log(dayCell)
    }

    // Add data or content to the cell as needed
    // dayCell.textContent = ''; // Add your data here
    newRow.appendChild(dayCell);
  }

  // Add the row to the table body
  tableBody.appendChild(newRow);
}