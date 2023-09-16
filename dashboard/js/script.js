const bodyEl = document.querySelector('body');

async function setRandomBackgroundImage() {
    const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=food');
    const data = await res.json();

    bodyEl.style.backgroundImage = `url('${data.urls.full}')`;
}

setRandomBackgroundImage();