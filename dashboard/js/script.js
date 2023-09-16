const bodyEl = document.querySelector('body');

async function setRandomBackgroundImage() {
    const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature');
    const data = await res.json();

    bodyEl.style.backgroundImage = `url(${data.urls.regular})`;
    bodyEl.innerHTML = `
        <h3>${data.user.name}</h3>
    `;
}

setRandomBackgroundImage();