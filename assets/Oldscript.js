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


// event listener from submission

search.addEventListener('submit', async function (e) {

  e.preventDefault();
  const weathrCity = cityInput.value;
  const appKey = "790d73cfa022cae9c19593e81acc2692"; // API application key
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${weathrCity}&appid=${appKey}`; // API endpoint for openweather search

  try {
      const response = await fetch(apiUrl);
      var data = await response.json();
      console.log(data);
      // Return the weather results in objects
      return data;

      const crtWeather = {
          name: data.city.name,
          date: new Date(data.)
      }
 
    } catch (errorType) {
      console.error("Error:", errorType);
      return null;
    }
})
