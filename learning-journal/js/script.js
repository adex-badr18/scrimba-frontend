// const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('post')) {
        location.href = './post-view.html'
    } else if (e.target.classList.contains('fa-bars')) {
        mobileMenu.classList.toggle('hidden');
    }
})