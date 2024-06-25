document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

function getWeather(location) {
    const apiKey = '94b18872506f9dfa2b3f0da7dfb0f838'; // Replace with your weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather data from: ${apiUrl}`); // Debugging line

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging line to check API response
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('Location not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Location: ${data.name}, ${data.sys.country}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
