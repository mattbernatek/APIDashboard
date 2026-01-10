const factBtn = document.querySelector("#fact-btn");
const catBtn = document.querySelector("#cat-btn");
const weatherBtn = document.querySelector("#weather-btn");
const currencyBtn = document.querySelector("#currency-btn");
const moviesBtn = document.querySelector("#movies-btn");
const githubBtn = document.querySelector("#github-btn");
const jokeBtn = document.querySelector("#joke-btn");
const adviceBtn = document.querySelector("#advice-btn");

const factOutput = document.querySelector("#fact-output");
const catOutput = document.querySelector("#cat-output");
const weatherOutput = document.querySelector("#weather-output");
const currencyOutput = document.querySelector("#currency-output");
const moviesOutput = document.querySelector("#movies-output");
const githubOutput = document.querySelector("#github-output");
const jokeOutput = document.querySelector("#joke-output");
const adviceOutput = document.querySelector("#advice-output");

const cityInput = document.querySelector("#city-input");
const amountInput = document.querySelector("#amount-input");
const sourceCurrencyInput = document.querySelector("#source-currency-input");
const targetCurrencyInput = document.querySelector("#target-currency-input");
const githubUserInput = document.querySelector("#github-user-input");

factBtn.addEventListener("click", getRandomFact);
catBtn.addEventListener("click", getCatImage);
weatherBtn.addEventListener("click", getWeather);
currencyBtn.addEventListener("click", getExchange);
moviesBtn.addEventListener("click", getMovies);
githubBtn.addEventListener("click", getGitHubUser);
jokeBtn.addEventListener("click", getJoke);
adviceBtn.addEventListener("click", getAdvice);

async function getRandomFact() {
    const factResponse = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
    const factData = await factResponse.json();

    factOutput.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = factData.text;
    factOutput.appendChild(p);
}

async function getCatImage() {
    const catResponse = await fetch("https://api.thecatapi.com/v1/images/search");
    const catData = await catResponse.json();
    catOutput.innerHTML = "";

    const img = document.createElement("img");

    img.src = catData[0].url;
    img.alt = "Random Cat Image";
    img.style.maxWidth = "100%";
    catOutput.appendChild(img);
}

async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        weatherOutput.textContent = "Please enter a city name.";
        return;
    }

    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
        weatherOutput.textContent = "City not found.";
        return;
    }

    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);

    if (!weatherResponse.current_weather || weatherResponse.current_weather.length === 0) {
        weatherOutput.textContent = "Problem getting weather data. Try again later.";
        return;
    }

    const weatherData = await weatherResponse.json();
}

async function getExchange() {
    let amount = amountInput.value.trim();
    amount = amount === "" ? 0 : Number(amount);

    const sourceCurrency = sourceCurrencyInput.value.trim().toUpperCase()
    const targetCurrency = targetCurrencyInput.value.trim().toUpperCase();

    if (amount < 0 || isNaN(amount)) {
        currencyOutput.textContent = "Please enter a valid amount.";
        return;
    }

    if (sourceCurrency.length !== 3 || targetCurrency.length !== 3) {
        currencyOutput.textContent = "Currency codes must be 3 letters.";
        return;
    }

    const exchangeResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
    const exchangeData = await exchangeResponse.json();

    if (!exchangeData.rates) {
        currencyOutput.textContent = "Problem getting exchange rates. Try again later";
        return;
    }

    if (!(targetCurrency in exchangeData.rates)) {
        currencyOutput.textContent = "Invalid target currency";
        return;
    }

    const rate = exchangeData.rates[targetCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    currencyOutput.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = `${amount} ${sourceCurrency} = ${convertedAmount} ${targetCurrency}`;
    currencyOutput.appendChild(p);
}

function getMovies() {

}

async function getGitHubUser() {
    const githubUser = githubUserInput.value.trim();
    if (!githubUser) {
        githubOutput.textContent = "Please enter a GitHub username.";
        return;
    }
    const githubResponse = await fetch(`https://api.github.com/users/${githubUser}`);
    if (githubResponse.status === 404) {
        githubOutput.textContent = "User not found.";
        return;
    }
    const githubData = await githubResponse.json();

    githubOutput.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = `Username: ${githubData.login}, Public Repos: ${githubData.public_repos}, Followers: ${githubData.followers}`;
    githubOutput.appendChild(p);
}

async function getJoke() {
    const jokeResponse = await fetch("https://official-joke-api.appspot.com/jokes/random");
    const jokeData = await jokeResponse.json();

    jokeOutput.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = `${jokeData.setup} ${jokeData.punchline}`;
    jokeOutput.appendChild(p);
}

async function getAdvice() {
    const adviceResponse = await fetch("https://api.adviceslip.com/advice");
    const adviceData = await adviceResponse.json();
    adviceOutput.innerHTML = "";
    
    const p = document.createElement("p");
    p.textContent = `${adviceData.slip.advice}`;
    adviceOutput.appendChild(p);
}