const authorEl = document.getElementById('author');
const cryptoEl = document.getElementById('crypto');
const cryptoImg = document.getElementById('crypto-img');
const cryptoName = document.getElementById('crypto-name');
const cryptoBody = document.getElementById('crypto-body');
const timeEl = document.getElementById('time');
const weatherTemp = document.getElementById('weather-temp');
const city = document.getElementById('city');

async function setRandomBackgroundImage() {
    try {
        const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature');
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
    const time = d.toLocaleTimeString('en-us', { timeStyle: "short" });
    timeEl.textContent = time;

    // OR
    // const hours = d.getHours();
    // const minutes = d.getMinutes();

    // const time = `${hours}:${minutes} ${hours > 12 ? 'PM' : 'AM'}`;

}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser!");
    } else {
        function success(position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            getWeatherInfo(lat, long);
        }

        function error() {
            console.log('Unable to retrieve your location');
        }

        const options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000,
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
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

            <p>${Math.round(weatherData.main.temp)}&deg;</p>
        `;

        city.textContent = weatherData.name;
    } catch (error) {
        console.log(error);
    }
}

fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(res => {
        if (!res.ok) throw Error('Crypto data not available.')
        return res.json()
    })
    .then(data => {
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
        cryptoEl.innerHTML = `
            <p>${error}</p>
        `;
    });

setRandomBackgroundImage();
setInterval(setRandomBackgroundImage, 10000);
setInterval(renderCurrentTime, 1000);
getCurrentLocation();
