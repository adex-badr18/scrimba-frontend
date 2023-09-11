const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');

document.addEventListener('click', (e) => {
    if (e.target === searchBtn) {
        e.preventDefault();
        if (searchInput.value) {
            console.log(searchInput.value);
            searchMovies();
        } else {
            searchForm.classList.add('required');
            searchInput.setAttribute('placeholder', 'Search for a movie - Field required');
        }
    }
})

async function searchMovies() {
    const apiKey = '80182aef';
    const searchTerm = searchInput.value;
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
    const searchResult = await res.json();

    // console.log(searchResult.Search);

    const movies = searchResult.Search.map((movie) => {
        // console.log(movie.imdbID);
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // return {
                //     title: data.Title,
                //     runtime: data.Runtime,
                //     genre: data.Genre,
                //     plot: data.Plot,
                //     image: data.Poster
                // };
            });
    });
    
    // console.log(movies);
}