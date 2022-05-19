const apiKey = "82856fbeaaf9ba8bc9a518550b4ed111";

const convertToCelcius = (tempKelvin) => {
    const result = Math.round(tempKelvin - 273.15) + " C°";
    return result;
}

const changingIcon = (weather) => {
    const sky = weather.weather[0].id;
    const iconImg = document.getElementById("Icon");
    if(299 < sky && sky < 501) {
        iconImg.classList.replace("bi-brightness-high", "bi-cloud-drizzle");
    } else if(500 < sky && sky < 532) {
        iconImg.classList.replace("bi-brightness-high", "bi-cloud-rain-heavy");
    } else if(sky > 800) {
        iconImg.classList.replace("bi-brightness-high", "bi-cloud-sun");
    } else {
        console.log("error");
    }
}

const castleOfGrass = (weather) => {
    let grass = document.getElementById("Grass");
    let chanceOfGrass;
    if(chanceOfGrass < 31 || chanceOfGrass > 49) {
        chanceOfGrass = "low";
    } else if(chanceOfGrass > 80) {
        chanceOfGrass = "very low";
    } else {
        chanceOfGrass = "high";
    }
    grass.textContent = `Chance of touching grass are ${chanceOfGrass}.`;
}

const windu = (weather) => {
    const wind = document.getElementById("Wind");
    wind.textContent = `Speed of wind is ${weather.wind.speed}m/s.`;
}

const homunculus = (weather) => {
    const humidity = document.getElementById("Humidity");
    humidity.textContent = `Humidity is ${weather.main.humidity}%.`;
}

const underThe = (weather) => {
    const pressure = document.getElementById("Pressure");
    pressure.textContent = `Pressure is ${weather.main.pressure} hPa.`;
} 

const showWeather = (weather) => {
    console.log(weather);
    const city = document.getElementById("CityName");
    city.textContent = weather.name;
    const normalTempSite = document.getElementById("Temp");
    normalTempSite.textContent = convertToCelcius(weather.main.temp);
    changingIcon(weather);
    castleOfGrass(weather);
    windu(weather);
    homunculus(weather);
    underThe(weather);

} 

const getWeatherByLocation = (info) => {
    const lat = info.coords.latitude;
    const lon = info.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url).then((res) => res.json()).then((res) => showWeather(res));
}

const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => getWeatherByLocation(pos));
}


getMyLocation();