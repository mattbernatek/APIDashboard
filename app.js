const quoteBtn = document.querySelector("#quote-btn");
const catBtn = document.querySelector("#cat-btn");
const weatherBtn = document.querySelector("#weather-btn");
const currencyBtn = document.querySelector("#currency-btn");
const moviesBtn = document.querySelector("#movies-btn");
const githubBtn = document.querySelector("#github-btn");
const jokeBtn = document.querySelector("#joke-btn");
const adviceBtn = document.querySelector("#advice-btn");

const quoteOutput = document.querySelector("#quote-output");
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

quoteBtn.addEventListener("click", getRandomQuote);
catBtn.addEventListener("click", getCatImage);
weatherBtn.addEventListener("click", getWeather);
currencyBtn.addEventListener("click", getExchange);
moviesBtn.addEventListener("click", getMovies);
githubBtn.addEventListener("click", getGitHubUser);
jokeBtn.addEventListener("click", getJoke);
adviceBtn.addEventListener("click", getAdvice);

async function getRandomQuote() {
    const quoteResponse = await fetch("https://api.quotable.io/quotes/random");
    const quoteData = await quoteResponse.json();
    

    quoteOutput.textContent = `${quoteData[0].quote} - ${quoteData[0].author}`;
    quoteOutput.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = `${quoteData[0].quote} - ${quoteData[0].author}`;
    quoteOutput.appendChild(p);
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

function getGitHubUser() {
  
}

async function getJoke() {
    const jokeResponse = await fetch("https://official-joke-api.appspot.com/jokes/random");
    const jokeData = await jokeResponse.json();
    jokeOutput.textContent = `${jokeData.setup} ${jokeData.punchline}`;

    jokeOutput.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = `${jokeData.setup} ${jokeData.punchline}`;
    jokeOutput.appendChild(p);
}

async function getAdvice() {
    const adviceResponse = await fetch("https://api.adviceslip.com/advice");
    const adviceData = await adviceResponse.json();
    adviceOutput.textContent = `${adviceData.slip.advice}`;
    adviceOutput.innerHTML = "";
    
    const p = document.createElement("p");
    p.textContent = `${adviceData.slip.advice}`;
    adviceOutput.appendChild(p);
}