const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// DOM Elements
const time = document.querySelector('.time'),
  todayDate = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  btnUpdateBg = document.querySelector('.btn');

// Options
const showAmPm = false;


// Get Image
const baseURL = 'assets/images/evening/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function getImage() {
  const index = i % images.length;
  const imageSrc = baseURL + images[index];
  displayBgImage(imageSrc);
  i++;
  console.log(i, imageSrc);
  btnUpdateBg.disabled = true;
  setTimeout(function() { btnUpdateBg.disabled = false }, 1000);
} 

// Display BG Image
function displayBgImage(url) {
  const body = document.querySelector('body');
  const src = url;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

// Make Images Array
let IMAGES_URL_ARRAY = [];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let stringUrl = '';

function generateUrlString(dayTime) {
  stringUrl = `assets/images/${dayTime}/${images[Math.floor(getRandomArbitrary(0, 19))]}`;
}

function addImageToArray(dayTime) {
  if (stringUrl === '') {
    generateUrlString(dayTime);
  }
  if (IMAGES_URL_ARRAY.includes(stringUrl)) {
    generateUrlString(dayTime);
    addImageToArray(dayTime);
  } else {
    IMAGES_URL_ARRAY.push(stringUrl);
  }
}

for (let i = 1; i <= 6;i++) {
  addImageToArray('night');
}
for (let i = 1; i <= 6;i++) {
  addImageToArray('morning');
}
for (let i = 1; i <= 6;i++) {
  addImageToArray('day');
}
for (let i = 1; i <= 6;i++) {
  addImageToArray('evening');
}

console.log(IMAGES_URL_ARRAY);

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
btnUpdateBg.addEventListener('click', getImage);

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
