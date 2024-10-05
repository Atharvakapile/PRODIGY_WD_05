const apiKey = 'af40fda84a5c3d926da39f4ee12c2ad9';

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    fetchWeather(location);
}

function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert('Error fetching weather data. Please try again.');
            console.error(error);
        });
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    alert('Error fetching weather data by location.');
                    console.error(error);
                });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById('weather-info').style.display = 'block';
}
function clearWeather() {
    document.getElementById('location-input').value = ''; // Clear the input field
    document.getElementById('city-name').innerText = '';
    document.getElementById('description').innerText = '';
    document.getElementById('temperature').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('wind').innerText = '';
    
    document.getElementById('weather-info').style.display = 'none'; // Hide weather info
}
