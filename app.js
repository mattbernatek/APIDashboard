// Button elements
const factBtn = document.querySelector("#fact-btn");
const catBtn = document.querySelector("#cat-btn");
const weatherBtn = document.querySelector("#weather-btn");
const currencyBtn = document.querySelector("#currency-btn");
const moviesBtn = document.querySelector("#movies-btn");
const githubBtn = document.querySelector("#github-btn");
const jokeBtn = document.querySelector("#joke-btn");
const adviceBtn = document.querySelector("#advice-btn");


// Output elements
const factOutput = document.querySelector("#fact-output");
const catOutput = document.querySelector("#cat-output");
const weatherOutput = document.querySelector("#weather-output");
const currencyOutput = document.querySelector("#currency-output");
const moviesOutput = document.querySelector("#movies-output");
const githubOutput = document.querySelector("#github-output");
const jokeOutput = document.querySelector("#joke-output");
const adviceOutput = document.querySelector("#advice-output");

// Input elements
const cityInput = document.querySelector("#city-input");
const amountInput = document.querySelector("#amount-input");
const sourceCurrencyInput = document.querySelector("#source-currency-input");
const targetCurrencyInput = document.querySelector("#target-currency-input");
const githubUserInput = document.querySelector("#github-user-input");

// a variable to store tmdb token in place of hardcoding it in the fetch headers
const tmdb_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTFlMTYyODBkZGFmNDViMjU4OWQ2NmViYWUyNDBhYSIsIm5iZiI6MTc2ODA4MDA3NS40NjgsInN1YiI6IjY5NjJjMmNiMWY3ODQzN2UwNjFkOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BKLhkrLkx8e1aubloK3adE230BomdHU_Ulzgocpv0qM";


// Event Listeners
factBtn.addEventListener("click", getRandomFact);
catBtn.addEventListener("click", getCatImage);
weatherBtn.addEventListener("click", getWeather);
currencyBtn.addEventListener("click", getExchange);
moviesBtn.addEventListener("click", getMovies);
githubBtn.addEventListener("click", getGitHubUser);
jokeBtn.addEventListener("click", getJoke);
adviceBtn.addEventListener("click", getAdvice);

// Functions

// Fetch a random fact from Useless Facts API
async function getRandomFact() {
    // Fetch the fact
    const factResponse = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");

    // Check if the response is ok, if not, display an error message and stop the function
    if (!factResponse.ok) {
        factOutput.textContent = "Problem getting a fact. Try again later.";
        return;
    }
    // Parse the JSON data
    const factData = await factResponse.json();
    // Clear previous output
    factOutput.innerHTML = "";
    // Create a paragraph element to display the fact
    const p = document.createElement("p");
    // Set the text content to the fact
    p.textContent = factData.text;
    // Append the paragraph to the output div
    factOutput.appendChild(p);
}

// Fetch a random cat image from The Cat API
async function getCatImage() {
    // Fetch the cat image
    const catResponse = await fetch("https://api.thecatapi.com/v1/images/search");
    // Check if the response is ok, if not, display an error message and stop the function
    if (!catResponse.ok) {
        catOutput.textContent = "Problem getting a cat image. Try again later.";
        return;
    }
    // Parse the JSON data
    const catData = await catResponse.json();
    
    // Clear previous output, if any
    catOutput.innerHTML = "";

    // Create an image element to display the cat image
    const img = document.createElement("img");

    // Set the src attribute to the cat image URL
    img.src = catData[0].url;
    // Set alt text
    img.alt = "Random Cat Image";
    // Set max width for better display
    img.style.maxWidth = "100%";
    // Append the image to the output div
    catOutput.appendChild(img);
}

// Fetch a random joke from Official Joke API
async function getJoke() {
    // Fetch the joke
    const jokeResponse = await fetch("https://official-joke-api.appspot.com/jokes/random");
    // Check if the response is ok, if not, display an error message and stop the function
    if (!jokeResponse.ok) {
        jokeOutput.textContent = "Problem getting a joke. Try again later.";
        return;
    }
    // Parse the JSON data
    const jokeData = await jokeResponse.json();
    // Clear previous output
    jokeOutput.innerHTML = "";
    // Create a paragraph element to display the joke
    const p = document.createElement("p");
    // Set the text content to the joke setup and punchline
    p.textContent = `${jokeData.setup} ${jokeData.punchline}`;
    // Append the paragraph to the output div
    jokeOutput.appendChild(p);
}

// Fetch a random advice from Advice Slip API
async function getAdvice() {
    // Fetch the advice
    const adviceResponse = await fetch("https://api.adviceslip.com/advice");
    // Check if the response is ok, if not, display an error message and stop the function
    if (!adviceResponse.ok) {
        adviceOutput.textContent = "Problem getting advice. Try again later.";
        return;
    }
    // Parse the JSON data
    const adviceData = await adviceResponse.json();
    // Clear previous output
    adviceOutput.innerHTML = "";
    // Create a paragraph element to display the advice
    const p = document.createElement("p");
    // Set the text content to the advice
    p.textContent = `${adviceData.slip.advice}`;
    // Append the paragraph to the output div
    adviceOutput.appendChild(p);
}

// Fetch GitHub user data from GitHub API
async function getGitHubUser() {
    // Get the username from input
    const githubUser = githubUserInput.value.trim();
    
    // Check if username is provided, if not, display an error message and stop the function
    if (!githubUser) {
        githubOutput.textContent = "Please enter a GitHub username.";
        return;
    }
    // Fetch the user data
    const githubResponse = await fetch(`https://api.github.com/users/${githubUser}`);
    // Check if the user exists, if not, display an error message and stop the function
    if (githubResponse.status === 404) {
        githubOutput.textContent = "User not found.";
        return;
    }
    // Parse the JSON data
    const githubData = await githubResponse.json();

    // Clear previous output
    githubOutput.innerHTML = "";
    // Create a paragraph element to display the user data
    const p = document.createElement("p");
    // Set the text content to the username, public repos, and followers
    p.textContent = `Username: ${githubData.login}, Public Repos: ${githubData.public_repos}, Followers: ${githubData.followers}`;
    // Append the paragraph to the output div
    githubOutput.appendChild(p);
}

// Fetch current weather data from Open-Meteo API based on city name
async function getWeather() {
    // Get the city name from input
    const city = cityInput.value.trim();
    // Check if city name is provided, if not, display an error message and stop the function
    if (!city) {
        weatherOutput.textContent = "Please enter a city name.";
        return;
    }
    // Fetch the latitude and longitude for the city using Open-Meteo Geocoding API
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    // Check if the response is ok, if not, display an error message and stop the function
    if (!geoResponse.ok) {
        weatherOutput.textContent = "Problem getting weather data. Try again later.";
        return;
    }
    // Parse the JSON data
    const geoData = await geoResponse.json();
    // Check if any results were returned
    if (!geoData.results || geoData.results.length === 0) {
        weatherOutput.textContent = "City not found.";
        return;
    }
    // Store the latitude and longitude
    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    // Fetch the current weather data  for the chosen city based on longitude and latitude using Open-Meteo Weather API
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    // Check if the response is ok, if not, display an error message and stop the function
    if (!weatherResponse.ok) {
        weatherOutput.textContent = "Problem getting weather data. Try again later.";
        return;
    }
    // Parse the JSON data
    const weatherData = await weatherResponse.json();
    // Check if current weather data is available
    if (!weatherData.current_weather) {
        weatherOutput.textContent = "Problem getting weather data. Try again later.";
        return;
    }
    // Clear previous output
    weatherOutput.innerHTML = "";
    // Create a paragraph element to display the weather data
    const p = document.createElement("p");
    // Set the text content to the temperature and wind speed
    p.textContent = `Current temperature in ${city} is ${weatherData.current_weather.temperature}°C with wind speed of ${weatherData.current_weather.windspeed} km/h.`;
    // Append the paragraph to the output div
    weatherOutput.appendChild(p);
}

// Fetch currency exchange rate from ExchangeRate-API and calculate converted amount 
async function getExchange() {
    // Get the amount from input. Trim it to remove extra spaces
    let amount = amountInput.value.trim();
    // If amount is empty, set it to 0, else convert it to a number
    amount = amount === "" ? 0 : Number(amount);
    // Get source and target currency codes from input, trim to remove extra spaces and convert to uppercase
    const sourceCurrency = sourceCurrencyInput.value.trim().toUpperCase()
    const targetCurrency = targetCurrencyInput.value.trim().toUpperCase();
    // Validate inputs - display an error for a negative amount or non-numeric value
    if (amount < 0 || isNaN(amount)) {
        currencyOutput.textContent = "Please enter a valid amount.";
        return;
    }
    // Validate currency codes - display an error if they are not 3 letters long
    if (sourceCurrency.length !== 3 || targetCurrency.length !== 3) {
        currencyOutput.textContent = "Currency codes must be 3 letters.";
        return;
    }
    // Fetch the exchange rates for the source currency
    const exchangeResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
    // Check if the response is ok, if not, display an error message and stop the function
    if (!exchangeResponse.ok) {
        currencyOutput.textContent = "Problem getting exchange rates. Try again later";
        return;
    }
    // Parse the JSON data
    const exchangeData = await exchangeResponse.json();
    // Check if rates are available
    if (!exchangeData.rates) {
        currencyOutput.textContent = "Problem getting exchange rates. Try again later";
        return;
    }
    // Check if target currency exists in the rates
    if (!(targetCurrency in exchangeData.rates)) {
        currencyOutput.textContent = "Invalid target currency";
        return;
    }
    // Calculate the converted amount
    const rate = exchangeData.rates[targetCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    // Clear previous output
    currencyOutput.innerHTML = "";
    // Create a paragraph element to display the converted amount
    const p = document.createElement("p");
    // Set the text content to show the conversion result
    p.textContent = `${amount} ${sourceCurrency} = ${convertedAmount} ${targetCurrency}`;
    currencyOutput.appendChild(p);
}

// Fetch 5 top trending movies from The Movie Database (TMDb) API
async function getMovies() {
    // Fetch the trending movies for the week. Use the tmdb_token for authorization instead of hardcoding the API key in the URL
    const moviesResponse = await fetch("https://api.themoviedb.org/3/trending/movie/week", {headers: { 
        Authorization: `Bearer ${tmdb_token}`, 
    }, 
    });
    // Check if the response is ok, if not, display an error message and stop the function
    if (!moviesResponse.ok) {
        moviesOutput.textContent = "Problem getting movies data. Try again later.";
        return;
    }
    // Parse the JSON data
    const moviesData = await moviesResponse.json();
    // Check if results are available
    if (!moviesData.results || moviesData.results.length === 0) {
        moviesOutput.textContent = "Problem getting movies data. Try again later.";
        return;
    }
    // Clear previous output
    moviesOutput.innerHTML = "";
    // Create a list to display the top 5 movies
    const ul = document.createElement("ul");
    // Append the list to the output div
    moviesOutput.appendChild(ul);
    // Loop through the top 5 movies and create list items
    moviesData.results.slice(0, 5).forEach(movie => {
        const li = document.createElement("li");
        li.textContent = `${movie.title} (Rating: ${movie.vote_average})`;
        ul.appendChild(li);
    });
};