const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');

document.addEventListener('click', (e) => {
    if (e.target === searchBtn) {
        e.preventDefault();
        if (searchInput.value) {
            searchForm.classList.remove('required');
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

    // console.log(searchResult);

    if (searchResult.Response === 'True') {
        let movies = await Promise.all(searchResult.Search.map(async (movie) => {
            // console.log(movie);
            const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}&plot=full`);
            const movieObj = await movieResponse.json();

            return {
                title: movieObj.Title,
                runtime: movieObj.Runtime,
                genre: movieObj.Genre,
                plot: movieObj.Plot,
                poster: movieObj.Poster,
                rating: movieObj.imdbRating
            };
        }));

        renderMovies(movies);
    } else {
        const emptyResult = `
            <h3 class="no-search-text">
                Unable to find what you’re looking for. Please try another search.
            </h3>
        `;

        movieList.innerHTML = emptyResult;
    }

}

function renderMovies(movies) {
    const moviesHtml = movies.map((movie, index) => {
        return `
            <div class="movie-container">
                <img src="${movie.poster === "N/A" ? './images/No-Image-Placeholder.png' : movie.poster}" class="movie-img" alt="${movie.title}">
                <div class="movie-info">
                    <div class="movie-header">
                        <h2 class="movie-title">${movie.title}</h2>
                        <span class="rating">
                            <i class="fa-solid fa-star"></i> ${movie.rating}
                        </span>
                    </div>

                    <div class="movie-sub-header">
                        <span class="movie-runtime">${movie.runtime}</span>
                        <span class="genre">${movie.genre}</span>
                        <span class="add">
                            <i class="fa-solid fa-circle-plus"></i> Watchlist
                        </span>
                    </div>

                    <p class="movie-description">
                    ${movie.plot}
                    </p>
                </div>
            </div>

            ${index !== movies.length - 1 ? '<hr>' : ''}
        `
    }).join(' ');

    movieList.innerHTML = moviesHtml;
}