// main.ts
import { getWeather } from "./api.js";
import { renderWeather } from "./ui.js";
import { state } from "./state.js";

// DOM elementen
const form = document.getElementById("search-form") as HTMLFormElement;
const input = document.getElementById("city-input") as HTMLInputElement;
const loadingEl = document.getElementById("loading-state")!;
const errorEl = document.getElementById("error-state")!;
const errorMsg = document.getElementById("error-message")!;


// Functie om alle states te resetten
function resetStates() {
    loadingEl.classList.add("hidden");
    errorEl.classList.add("hidden");
}

// Event listener voor form submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;

    // reset loading/error
    resetStates();
    loadingEl.classList.remove("hidden");

    try {
        // API call
        const weather = await getWeather(city);
        state.currentWeather = weather;

        // UI updaten
        renderWeather(weather);
    } catch (err) {
        // Error tonen
        errorEl.classList.remove("hidden");
        errorMsg.textContent = (err as Error).message;
    } finally {
        // Loading verbergen
        loadingEl.classList.add("hidden");
    }
});
