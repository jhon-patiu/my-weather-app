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

// Date and Time
let date = new Date();

setInterval(setClock, 1000);

function setClock() {
  let currentDate = new Date();

  // 12-hr clock
  if (currentDate.getHours() <= 12) {
    hoursText.innerText = currentDate.getHours();
    amPm.innerText = "AM";
  } else {
    hoursText.innerText = currentDate.getHours() - 12;
    amPm.innerText = "PM";
  }

  // 2-digit minutes when < 10
  if (currentDate.getMinutes() >= 10) {
    minutesText.innerText = currentDate.getMinutes();
  } else {
    minutesText.innerText = "0" + currentDate.getMinutes();
  }

  // 2-digit secs when < 10
  if (currentDate.getSeconds() >= 10) {
    secondsText.innerText = currentDate.getSeconds();
  } else {
    secondsText.innerText = "0" + currentDate.getSeconds();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getDay();
  getMonth();
  getDate();
  getYear();

  // get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      // success callback

      // reverse geocoding
      const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.ac6703283a8e50678da273765a018154&lat=${lat}&lon=${long}&format=json`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let city = data.address.city;
          let state = data.address.state;
          let country = data.address.country;
          if (city && state !== undefined) {
            myCity.innerText = city + ", " + state;
            myCountry.innerText = country;
          } else {
            let village = data.address.village;
            let region = data.address.region;
            myCity.innerText = village + ", " + region;
            myCountry.innerText = country;
          }
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

  // get weather of location
});

function getWeather(weatherURL) {
  let temp;
  fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
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
