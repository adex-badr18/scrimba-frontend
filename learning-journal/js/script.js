const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const last3Posts = [...document.querySelectorAll('article.last-three')];

last3Posts.forEach(post => {
    post.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('post')) {
        window.location.href = '/learning-journal/post-view.html';
    } else if (e.target.classList.contains('fa-bars')) {
        mobileMenu.classList.toggle('hidden');

        mobileMenuBtn.style.display = 'none';
        closeMenuBtn.style.display = 'block';

    } else if (e.target.classList.contains('fa-xmark')) {
        mobileMenu.classList.toggle('hidden');

        mobileMenuBtn.style.display = 'block';
        closeMenuBtn.style.display = 'none';
    } else if (e.target.classList.contains('logo-wrapper')) {
        window.location.href = '/learning-journal/index.html';
    } else if (e.target.classList.contains('view-more-link')) {
        const viewMore = document.querySelector('a.view-more-link');

        e.preventDefault();

        if (last3Posts[0].style.display === 'none') {
            last3Posts.forEach(post => {
                post.style.display = 'grid';
            });

            viewMore.textContent = 'View less';
        } else {
            last3Posts.forEach(post => {
                post.style.display = 'none';
            });

            viewMore.textContent = 'View more';
        }
    }
}) 