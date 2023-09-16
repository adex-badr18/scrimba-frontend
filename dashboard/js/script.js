const authorEl = document.getElementById('author');

async function setRandomBackgroundImage() {
    try {
        const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=architecture');
        const data = await res.json();

        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        authorEl.textContent = `By: ${data.user.name}`;
    } catch (error) {
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQ4NjcxNzR8&ixlib=rb-4.0.3&q=85')`
    }
}

setRandomBackgroundImage();