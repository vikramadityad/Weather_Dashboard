
const appKey = "790d73cfa022cae9c19593e81acc2692"; // API application key
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast`; // API endpoint for openweather search

async function searchCity(query) {
  var cityName = encodeURIComponent(query); // Convert query into the URL friendly
  var url = `${apiUrl}?q=${cityName}&appid=${appKey}`; //Var URL with the query

  try {
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
    // Return the weather results in objects
    localStorage.setItem(query, JSON.stringify(data))
    return data;
  } catch (errorType) {
    console.error("Error:", errorType);
    return null;
  }
}


const search = document.getElementById('search_form');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city');
const currentDate = document.getElementById('date');
const temperature = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind');

// forecast
const forecastList = document.getElementById('forecast-list');


// city history
const historyList = document.getElementsById('hist_container');



const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

function updateSearchHistory() {
  historyList.innerHTML = '';
  searchHistory.forEach((city) => {
      const historyItem = document.createElement('button');
      historyItem.classList.add("btn btn-secondary");
      historyItem.textContent = city;
      historyList.appendChild(historyItem);
  });

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}


// 

search.addEventListener('submit', function (e) {

  e.preventDefault();
  const cityInput = document.getElementById('city-input');
  const weathrCity = cityInput.value;
  var weatherData = searchCity(weathrCity);
  
  localStorage.setItem('weatherData', JSON.stringify(weatherData));
})



var todayWeathr = document.querySelector






