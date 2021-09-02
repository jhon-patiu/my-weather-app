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
let weatherIcons = document.querySelectorAll(".weather-icons");
const tempConvertBtn = document.getElementById("temp-converter");
const switchButton = document.querySelector("input[type='checkbox']");
let long;
let lat;

// API keys
const weatherKey = keys.OPENWEATHER_API_KEY;

// get Date and Time
let date = new Date();

document.addEventListener("DOMContentLoaded", () => {
  getDay();
  getMonth();
  getDate();
  getYear();

  // get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      // success callback

      // reverse geocoding
      const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.ac6703283a8e50678da273765a018154&lat=${lat}&lon=${long}&format=json`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const { city, state, country } = data.address;
          console.log(data);
          myCity.innerText = city + ", " + state;
          myCountry.innerText = country;
        })
        .then(
          getWeather(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${weatherKey}`
          )
        );
      // error callback
      (err) => {
        console.log(err);
      };
      // options
      {
        enableHighAccuracy: true;
      }
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
      temp = parseInt(temp).toFixed(0);
      tempValue.innerText = temp;

      let forecast = data.weather[0].main;
      let weatherID = data.weather[0].id;
      // determine which icon to show depending on forecast
      if (forecast === "Clouds") {
        weatherIcons[2].classList.toggle("show");
      } else if (forecast === "Thunderstorm") {
        weatherIcons[6].classList.toggle("show");
      } else if (
        (forecast === "Rain" && weatherID === 500) ||
        501 ||
        520 ||
        521
      ) {
        weatherIcons[3].classList.toggle("show");
      } else if (
        (forecast === "Rain" && weatherID === 502) ||
        503 ||
        504 ||
        522 ||
        531
      ) {
        weatherIcons[4].classList.toggle("show");
      } else if (forecast === "Snow") {
        weatherIcons[5].classList.toggle("show");
      } else if (forecast === "Clear") {
        weatherIcons[0].classList.toggle("show");
      } else if (forecast === "Drizzle") {
        weatherIcons[3].classList.toggle("show");
      }
      let { description } = data.weather[0];
      descriptionText.innerText = '"' + description + '"';

      switchButton.addEventListener("change", () => {
        if (tempDegree.dataset.unit === "C") {
          temp = (temp * 9) / 5 + 32;
          tempValue.innerText = parseInt(temp).toFixed(0);
          tempDegree.dataset.unit = "F";
          tempDegree.innerText = "F" + "°";
          return;
        } else {
          temp = ((temp - 32) * 5) / 9;
          tempValue.innerText = parseInt(temp).toFixed(0);
          tempDegree.dataset.unit = "C";
          tempDegree.innerText = "C" + "°";
        }
      });
    });
}

// convert C to F

// function convertToFarenheit(celsius) {
//   return (celsius = (celsius * 9) / 5 + 32);
// }
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
