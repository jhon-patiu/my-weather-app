"use strict";

// selectors
let dayText = document.getElementById("dayText");
let monthText = document.getElementById("monthText");
let dateText = document.getElementById("dateText");
let yearText = document.getElementById("yearText");
let timeDisplay = document.querySelector(".time-display");
let hoursText = document.getElementById("hours");
let minutesText = document.getElementById("minutes");
let secondsText = document.getElementById("seconds");
let amPm = document.getElementById("amPm");

// get Date and Time
let date = new Date();

document.addEventListener("DOMContentLoaded", () => {
  displayTime();
  getDay();
  getMonth();
  getDate();
  getYear();

  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;

      // const proxy = 'https://cors-anywhere.herokuapp.com/corsdemo'
    });
  }
});

// get and set Time
function displayTime() {
  // get hr
  let hour = date.getHours();
  if (hour > 12) {
    return hour - 12;
  }

  hoursText.innerText = hour;

  // get min
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  minutesText.innerText = minute;

  // am or pm
  if (date.getHours > 12) {
    amPm.innerText = "PM";
  } else {
    amPm.innerText = "AM";
  }

  // get sec
  //   let getSec = date.getSeconds();
  //   let secs = setInterval(getSec, 1000);
  //   secondsText.innerText = secs;
}

// get and set Date
function getDay() {
  // get Day
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let index = date.getDay();
  let day = days[index];
  dayText.innerText = day;
}

function getMonth() {
  // get Month
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let index = date.getMonth();
  let month = months[index];
  monthText.innerText = month;
}

function getDate() {
  dateText.innerText = date.getDate() + ",";
}

function getYear() {
  yearText.innerText = date.getFullYear();
}
