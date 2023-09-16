const authorEl = document.getElementById('author');
const cryptoEl = document.getElementById('crypto');

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

fetch('https://api.coingecko.com/api/v3/coins/dogecoins')
    .then(res => {
        if (!res.ok) throw Error('Could not get crypto data! Please try again.')
        return res.json()
    })
    .then(data => console.log(data))
    .catch(error => {
        // console.error(error);
        cryptoEl.innerHTML = `
            <p>${error}</p>
        `;
    });

setRandomBackgroundImage();