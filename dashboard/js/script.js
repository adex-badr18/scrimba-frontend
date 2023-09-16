const authorEl = document.getElementById('author');
const cryptoEl = document.getElementById('crypto');
const cryptoImg = document.getElementById('crypto-img');
const cryptoName = document.getElementById('crypto-name');
const cryptoBody = document.getElementById('crypto-body');
const timeEl = document.getElementById('time');
const weatherTemp = document.getElementById('weather-temp');
const country = document.getElementById('country');

async function setRandomBackgroundImage() {
    try {
        const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=architecture');
        const data = await res.json();

        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        authorEl.textContent = `By: ${data.user.name}`;
    } catch (error) {
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQ4NjcxNzR8&ixlib=rb-4.0.3&q=85')`
        authorEl.textContent = 'Thanos Pal';
    }
}

function renderCurrentTime() {
    const d = new Date();
    // const hours = d.getHours();
    // const minutes = d.getMinutes();

    // const time = `${hours}:${minutes} ${hours > 12 ? 'PM' : 'AM'}`;
    const time = d.toLocaleTimeString('en-us', { timeStyle: "short" });
    timeEl.textContent = time;
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser!");
    } else {
        function success(position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            console.log(lat, long);
            getWeatherInfo(lat, long);
        }

        function error() {
            console.log('Unable to retrieve your location');
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }
}

async function getWeatherInfo(lat, long) {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`);

        if (!res.ok) {
            throw Error('Unable to get weather data');
        }

        const weatherData = await res.json();

        weatherTemp.innerHTML = `
            <img src='https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png') alt='${weatherData.weather[0].description}' >

            <p>${Math.ceil(weatherData.main.temp)}&deg;</p>
        `;

        country.textContent = weatherData.name;

        console.log(weatherData);
    } catch (error) {
        console.log(error);
    }
}

function getWeatherIcon(iconID) {
    fetch(`https://openweathermap.org/img/wn/${iconID}@2x.png`)
        .then(res => res.json())
}

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res => {
        if (!res.ok) throw Error('Crypto data not available.')
        return res.json()
    })
    .then(data => {
        console.log(data);
        cryptoImg.setAttribute('src', `${data.image.small}`);
        cryptoImg.setAttribute('alt', `${data.name}`);
        cryptoName.textContent = data.name;

        cryptoBody.innerHTML = `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>⬆️: $${data.market_data.high_24h.usd}</p>
            <p>⬇️: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(error => {
        // console.error(error);
        cryptoEl.innerHTML = `
            <p>${error}</p>
        `;
    });

setRandomBackgroundImage();
setInterval(renderCurrentTime, 1000);
getCurrentLocation();
