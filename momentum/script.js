const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let hour = 0;
let min = 0;
let sec = 0;

// DOM Elements
const time = document.querySelector('.time'),
  todayDate = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  btnUpdateBg = document.querySelector('.bg-btn'),
  quoteText = document.querySelector('.quote-text'),
  btnUpdateQuote = document.querySelector('.quote-btn');

// Options
const showAmPm = false;

// Make Images Array
const IMAGE_PATHS = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

let imagesUrlArray = [];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let stringUrl = '';

function generateUrlString(dayTime) {
  stringUrl = `assets/images/${dayTime}/${IMAGE_PATHS[Math.floor(getRandomArbitrary(0, 19))]}`;
}

function addImageToArray(dayTime) {
  if (stringUrl === '') {
    generateUrlString(dayTime);
  }
  if (imagesUrlArray.includes(stringUrl)) {
    generateUrlString(dayTime);
    addImageToArray(dayTime);
  } else {
    imagesUrlArray.push(stringUrl);
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

console.log(imagesUrlArray);

// Show Time
function showTime() {
  let today = new Date();

  hour = today.getHours();
  min = today.getMinutes();
  sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  // Update Bg Image when an hour starts
  if (min === 0 && sec === 0) {
    setBgImage(hour);
    setGreeting();
  }

  // Update date when a new day starts
  if (hour === 0 && min === 0 && sec === 0) {
    showDate();
    setGreeting();
  }

  setTimeout(showTime, 1000);
}

// Show Date
function showDate() {
  let today = new Date(),
    day = today.getDay(),
    date = today.getDate(),
    month = today.getMonth();

    todayDate.innerHTML = `${DAYS_OF_WEEK[day]}<span>, </span>${MONTHS[month]} ${date}`;
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgImage(hour) {
    
  let bgImageSrc = imagesUrlArray[hour];

  const img = document.createElement('img');
  img.src = bgImageSrc;
  img.onload = () => {      
    document.body.style.backgroundImage = `url('${bgImageSrc}')`;
  }; 
}

function setGreeting() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon, ';
  } else {
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

// Display Quotes
async function displayQuote() {  
  btnUpdateQuote.disabled = true;

  const url = `https://programming-quotes-api.herokuapp.com/quotes/`;
  const res = await fetch(url);
  const data = await res.json(); 

  let quoteInd = Math.floor(getRandomArbitrary(0, 500));
  quoteText.textContent = data[quoteInd].en;

  btnUpdateQuote.disabled = false;
}

// Run
showTime();
showDate();
setBgImage(hour);
setGreeting();
getName();
getFocus();
document.addEventListener('DOMContentLoaded', displayQuote);

// Customize Button Show Next Bg Images
let i = hour;
let index = i;

function scrollBgImages() {
  if (index === 23) {
    index = 0;
  } else {
    index++;
  }

  setBgImage(index);

  btnUpdateBg.disabled = true;
  setTimeout(function() { btnUpdateBg.disabled = false }, 1000);
}

btnUpdateBg.addEventListener('click', scrollBgImages);
btnUpdateQuote.addEventListener('click', displayQuote);