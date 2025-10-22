document.addEventListener('DOMContentLoaded', async () => {
    const weatherDetailsEl = document.getElementById('weather-details');
    const loadingEl = document.getElementById('loading');
    const errorMessageEl = document.getElementById('error-message');

    if (!weatherDetailsEl || !loadingEl || !errorMessageEl) {
        console.error('DOM elements not found');
        return;
    }

    try {
        const response = await fetch('weather_data.json');
        if (!response.ok) throw new Error('Failed to load weather data');

        const data = await response.json();
        displayWeatherData(data);
        loadingEl.classList.add('d-none');
        weatherDetailsEl.classList.remove('d-none');
    } catch (error) {
        console.error('Error loading weather data:', error);
        errorMessageEl.textContent = 'Failed to load weather data. Please try again later.';
        errorMessageEl.classList.remove('d-none');
        loadingEl.classList.add('d-none');
    }
});

function displayWeatherData(data) {
    if (!data || !data.current || !data.forecast) {
        console.error('Invalid data structure');
        return;
    }

    const locationEl = document.getElementById('location');
    const temperatureEl = document.getElementById('temperature');
    const conditionEl = document.getElementById('condition');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');
    const conditionIconEl = document.getElementById('condition-icon');

    if (!locationEl || !temperatureEl || !conditionEl || !humidityEl || !windSpeedEl || !conditionIconEl) {
        console.error('DOM elements not found');
        return;
    }

    locationEl.textContent = data.location;
    temperatureEl.textContent = data.current.temperature;
    conditionEl.textContent = data.current.condition;
    humidityEl.textContent = data.current.humidity;
    windSpeedEl.textContent = data.current.wind_speed;
    conditionIconEl.textContent = getWeatherEmoji(data.current.condition);

    const forecastEl = document.getElementById('forecast');
    if (!forecastEl) {
        console.error('Forecast element not found');
        return;
    }

    forecastEl.innerHTML = '';
    data.forecast.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = 'forecast-day';
        dayEl.innerHTML = `
            <p><strong>${day.day}</strong></p>
            <p>High: ${day.high}°F</p>
            <p>Low: ${day.low}°F</p>
            <p>${day.condition} ${getWeatherEmoji(day.condition)}</p>
        `;
        forecastEl.appendChild(dayEl);
    });
}

function getWeatherEmoji(condition) {
    switch (condition.toLowerCase()) {
        case 'sunny':
            return '☀️';
        case 'cloudy':
            return '☁️';
        case 'rainy':
            return '🌧️';
        default:
            return '';
    }
}
