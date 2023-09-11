const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');


document.addEventListener('click', (e) => {
    if (e.target === searchBtn) {
        e.preventDefault();
        console.log('Search button clicked');
    }
})