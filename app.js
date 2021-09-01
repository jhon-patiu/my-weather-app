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
let myCity = document.querySelector(".city");
let myCountry = document.querySelector(".country");
let tempValue = document.querySelector(".temp-value");
let tempDegree = document.querySelector(".temp-degree");
let descriptionText = document.querySelector(".description-text");
let long;
let lat;
const apikey = "51fb667ebfd0e051c4595c5f3bb54757";

// get Date and Time
let date = new Date();

document.addEventListener("DOMContentLoaded", () => {
  getDay();
  getMonth();
  getDate();
  getYear();

  // get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;

      // reverse geocoding
      const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.ac6703283a8e50678da273765a018154&lat=${lat}&lon=${long}&format=json`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let { city, state, country } = data.address;
          myCity.innerText = city + ", " + state;
          myCountry.innerText = country;
        })
        .then(
          getWeather(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`
          )
        );
    });
  }

  // const proxy = "https://cors-anywhere.herokuapp.com/corsdemo";

  // get weather of location
});

function getWeather(weatherURL) {
  let temp;
  fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      temp = data.main.temp;
      console.log(temp);
      let forecast = data.weather[0].main;
      console.log(forecast);
      let { description } = data.weather[0];
      console.log(description);
      descriptionText.innerText = '"' + description + '"';
    })
    .then(convertTemp(temp));

  function convertTemp(temp) {
    if (tempDegree.innerText === "C") {
      temp - 273.15;
    } else {
      ((temp - 273.15) * 9) / 5 + 32;
    }
    return (tempValue.innerText = temp);
  }
}

// get and set Time
// function displayTime() {
//   // get hr
//   let hour = date.getHours();
//   if (hour > 12) {
//     return hour - 12;
//   }

//   hoursText.innerText = hour;

//   // get min
//   let minute = date.getMinutes();
//   if (minute < 10) {
//     minute = "0" + minute;
//   }
//   minutesText.innerText = minute;

//   // am or pm
//   if (date.getHours > 12) {
//     amPm.innerText = "PM";
//   } else {
//     amPm.innerText = "AM";
//   }
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
