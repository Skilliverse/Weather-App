// script.js
window.addEventListener('load', () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          try {
              const response = await fetch(apiUrl);
              const data = await response.json();
              displayWeather(data);
          } catch (error) {
              console.error('Error fetching weather data:', error);
              displayError();
          }
      }, () => {
          console.error('Geolocation is not supported by this browser.');
          displayError();
      });
  } else {
      console.error('Geolocation is not supported by this browser.');
      displayError();
  }
});

function displayWeather(data) {
  const weatherInfo = document.querySelector('.weather-info');
  weatherInfo.innerHTML = `
      <p>Location: ${data.name}</p>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Description: ${data.weather[0].description}</p>
  `;
}

function displayError() {
  const weatherInfo = document.querySelector('.weather-info');
  weatherInfo.innerHTML = '<p>Unable to fetch weather data.</p>';
}
