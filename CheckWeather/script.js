

const apiKey = "5e0acca2b57b8a50caa0811e82cdaf9f";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        console.log("City name is required");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === "404") {
            console.log("City not found");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "cloudy.png";  
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "weather.png";  
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "rainy.png";  
        } else if (data.weather[0].main === "Drizzle") {  
            weatherIcon.src = "rainy&sunny.png";  
        } else if (data.weather[0].main === "Mist") {  
            weatherIcon.src = "mist.png";  
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchbtn.addEventListener("click" , () => {
    checkWeather(searchbox.value);
});
searchbtn.addEventListener("keyup" , (evt) => {
    if(evt.key === "Enter")
    checkWeather(searchbox.value);
});


checkWeather();
