const authorEl = document.getElementById('author');

async function setRandomBackgroundImage() {
    const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature');
    const data = await res.json();

    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    authorEl.textContent = `By: ${data.user.name}`;
}

setRandomBackgroundImage();