const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');

document.addEventListener('click', (e) => {
    if (e.target === searchBtn) {
        e.preventDefault();
        if (searchInput.value) {
            console.log(searchInput.value);
        } else {
            searchForm.classList.add('required');
            searchInput.setAttribute('placeholder', 'Search for a movie - Field required');
        }
    }
})