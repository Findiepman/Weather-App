import { getWeather } from "./api.js";
import { state } from "./state.js";


export function renderWeather(weather: Weather) {
    const locationEl = document.getElementById("location-name")!;
    const tempEl = document.getElementById("temperature")!;
    const descEl = document.getElementById("weather-description")!;
    const feelsLikeEl = document.getElementById("feels-like")!;
    const humidityEl = document.getElementById("humidity")!;
    const windEl = document.getElementById("wind-speed")!;
    const pressureEl = document.getElementById("pressure")!;
    const visibilityEl = document.getElementById("visibility")!;
    const iconEl = document.getElementById("weather-icon")!;

    locationEl.textContent = `${weather.city}, ${weather.country}`;
    tempEl.textContent = `${Math.round(weather.temperature)}°C`;
    descEl.textContent = weather.description;
    feelsLikeEl.textContent = `Feels like ${Math.round(weather.feelsLike)}°C`;
    humidityEl.textContent = `${weather.humidity}%`;
    windEl.textContent = `${weather.windSpeed} m/s`;
    pressureEl.textContent = `${weather.pressure} hPa`;
    visibilityEl.textContent = `${weather.visibility} km`;
    iconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}.png" />`;

    document.getElementById("weather-display")!.classList.remove("hidden");
}
const form = document.getElementById("search-form") as HTMLFormElement;
const input = document.getElementById("city-input") as HTMLInputElement;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;

    try {
        document.getElementById("loading-state")!.classList.remove("hidden");
        const weather = await getWeather(city);
        state.currentWeather = weather;
        renderWeather(weather);
    } catch (err) {
        const errorEl = document.getElementById("error-message")!;
        errorEl.textContent = (err as Error).message;
        document.getElementById("error-state")!.classList.remove("hidden");
    } finally {
        document.getElementById("loading-state")!.classList.add("hidden");
    }
});
