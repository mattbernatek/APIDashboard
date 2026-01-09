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

function getWeather() {
  
}

function getExchange() {

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