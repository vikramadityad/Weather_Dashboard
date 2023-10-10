document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search_form');
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city');
    const currentDate = document.getElementById('date');
    const temperature = document.getElementById('temp');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind');
    const weatherIcon = document.getElementById('icon');
    const forecastList = document.getElementById('small_bundle');
    const historyContainer = document.getElementById('hist_container');


    // Initialize search history from localStorage
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Function to update the search history in the UI and localStorage
    function updateSearchHistory() {
        historyContainer.innerHTML = '';
        searchHistory.forEach((city) => {
            historyItem = document.createElement('button');
            historyItem.classList.add("btn", "btn-secondary");
            historyItem.textContent = city;
            historyContainer.appendChild(historyItem);
        });

        // Update localStorage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    // Function to fetch weather data from the API
    async function fetchWeatherData(city) {
        const apiKey = '790d73cfa022cae9c19593e81acc2692'; // Replace with your actual OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data)

            return {
                name: data.name,
                date: new Date().toLocaleDateString(),
                temperature: (((data.main.temp - 273.15) * 1.8) + 32).toFixed(2),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather[0].icon
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Function to fetch 5-day forecast data from the API with 5 different dates


    async function fetch5DayForecast(city) {

        const geocodingApiKey = 'f2dc2f4ada064ba580b373d6f20f3182';
        const cityName = city;

        const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${geocodingApiKey}`;

            const geoResponse = await fetch(geocodingApiUrl)
            const geocodingData = await geoResponse.json();


            const lat = geocodingData.results[0].geometry.lat;
            const lon = geocodingData.results[0].geometry.lng;
            const cnt = 5;


        const apiKey = '790d73cfa022cae9c19593e81acc2692'; // Replace with your actual OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);

            // Calculate the current date and initialize an array for the 5 different dates
            const currentDate = new Date();
            
            const differentDates = [currentDate];

                 


            // Calculate the 5 different dates starting from the current date
            for (let i = 1; i < 6; i++) {
                const nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + i);
                differentDates.push(nextDate);
            }

            // Extract the 5-day forecast data with one forecast per day
            const forecastData = [];

            data.list.forEach((item) => {
                const itemDate = new Date(item.dt * 1000);
                   
                if (differentDates.some((date) => date.getDate() === itemDate.getDate()) && item.dt_txt.includes("00:00:00") ) {
                    forecastData.push({
                        date: new Date(item.dt * 1000).toLocaleDateString(),
                        temperature: (((item.main.temp - 273.15) * 1.8) + 32).toFixed(2),
                        humidity: item.main.humidity,
                        windSpeed: item.wind.speed,
                        icon: item.weather[0].icon
                    });
                }
            });

            return forecastData;
        } catch (error) {
            console.error('Error fetching 5-day forecast data:', error);
            throw error;
        }
    }

    // Submit form function

    const submitForm = async function (e) {
        e.preventDefault();
        const city = cityInput.value;

        try {
            const weatherData = await fetchWeatherData(city);
            const forecastData = await fetch5DayForecast(city);

            // Update current weather display
            cityName.textContent = weatherData.name;
            currentDate.textContent = `(${weatherData.date})`;
            temperature.textContent = `Temp: ${weatherData.temperature}°F`;
            humidity.textContent = `Humidity: ${weatherData.humidity}%`;
            windSpeed.textContent = `Wind: ${weatherData.windSpeed} MPH`;
            const weatherIcon = document.getElementById('icon');
            weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.icon}.png`;
            weatherIcon.alt = 'Weather Icon';

            // Clear existing forecast data
            forecastList.innerHTML = '';

            // Append 5-day forecast data to the list
            forecastData.forEach((day, index) => {
                const forecastItem = document.createElement('div');
                forecastItem.classList.add('small_container');
                forecastItem.classList.add(`${day.date}`);
                forecastItem.innerHTML = `
                        <h4 class="date${index + 1}">${day.date}</h4>
                        <img id="icon${index + 1}" src="" alt="Weather Icon">
                        <p id="temp${index + 1}">Temp: ${day.temperature}°F</p>
                        <p id="wind${index + 1}">Wind: ${day.windSpeed} MPH</p>
                        <p id="humidity${index + 1}">Humidity: ${day.humidity}%</p>
                    `;
                forecastList.appendChild(forecastItem);

                // Set the weather icon for each forecast day
                const weatherIcon = document.getElementById(`icon${index + 1}`);
                weatherIcon.src = `https://openweathermap.org/img/wn/${day.icon}.png`;
                weatherIcon.alt = 'Weather Icon';
            });

            // Add city to search history
            searchHistory.unshift(city);
            updateSearchHistory();

            // Clear the input field
            cityInput.value = '';
        } catch (error) {
            // Handle errors here
        }
    }

    // Event listener for form submission
    searchForm.addEventListener('submit', submitForm);

    // Initialize search history in the UI
    updateSearchHistory();

    // Event listener for history buttons
      const historyBtn = document.querySelectorAll('.btn-secondary');

    console.log(historyBtn);
    historyBtn.forEach((item) => {
        item.addEventListener("click", function (e) {
            console.log(e.target.textContent);
            const histCity = e.target.textContent;
            cityInput.value = histCity;
            document.querySelector(".btn-primary").click()
        })
    })
});


