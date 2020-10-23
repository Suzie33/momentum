const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// DOM Elements
const time = document.querySelector('.time'),
  todayDate = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options
const showAmPm = false;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// ShowDate
function showDate() {
  let today = new Date(),
    day = today.getDay(),
    date = today.getDate(),
    month = today.getMonth();

    todayDate.innerHTML = `${DAYS_OF_WEEK[day]}<span>, </span>${MONTHS[month]} ${date}`;

    setTimeout(showDate, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    document.body.style.backgroundImage =
    "url('assets/images/night/01.jpg')";
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
    "url('assets/images/morning/01.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('assets/images/day/01.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('assets/images/evening/01.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
    localStorage.setItem('name', '[Enter Name]')
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent == '') {
        name.textContent = localStorage.getItem('name');
      } else {
        localStorage.setItem('name', e.target.innerText);
      }
      name.blur();
    }
  } else {
    if (name.textContent == '') {
      name.textContent = localStorage.getItem('name');
    } else {
      localStorage.setItem('name', e.target.innerText);
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
    localStorage.setItem('focus', '[Enter Focus]')
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent == '') {
        focus.textContent = localStorage.getItem('focus');
      } else {
        localStorage.setItem('focus', e.target.innerText);
      }
      focus.blur();
    }
  } else {
    if (focus.textContent == '') {
      focus.textContent = localStorage.getItem('focus');
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
  }
}

//Make the fields empty when we click on
name.addEventListener('click', () => {
  name.textContent = '';
})
focus.addEventListener('click', () => {
  focus.textContent = '';
})

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();