// const navMenu = document.getElementById('nav-menu');
const nav = document.getElementById('nav');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('post')) {
        location.href = './post-view.html'
    } else if (e.target.classList.contains('fa-bars')) {
        
    }
})