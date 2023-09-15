const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');
const watchlist = document.getElementById('watchlist');

const isWatchlistPage = document.URL.includes('watchlist.html');

// localStorage.removeItem('watchlist');
// localStorage.setItem('watchlist', JSON.stringify([]));

if (isWatchlistPage) {
    const watchlistInLocalStorage = JSON.parse(localStorage.getItem('watchlist'));
    if (watchlistInLocalStorage && watchlistInLocalStorage.length !== 0) {
        watchlist.style.justifyContent = 'flex-start';
        renderMovies(watchlistInLocalStorage);
    } else {
        watchlist.innerHTML = `
            <h3 class="no-search-text">Your watchlist is looking a little empty...</h3>
            <a href="./index.html" class="add-watchlist">
                <i class="fa-solid fa-circle-plus"></i> Let's add some movies!
            </a>
        `
    }
}

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
    } else if (e.target.dataset.id && e.target.classList.contains('add')) {
        addMovieToWatchlist(e.target.dataset.id);
    } else if (e.target.dataset.id && e.target.classList.contains('remove')) {
        removeMovieFromWatchlist(e.target.dataset.id);
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
            const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`);
            const movieObj = await movieResponse.json();

            return {
                id: movieObj.imdbID,
                title: movieObj.Title,
                runtime: movieObj.Runtime,
                genre: movieObj.Genre,
                plot: movieObj.Plot,
                poster: movieObj.Poster,
                rating: movieObj.imdbRating
            };
        }));

        const moviesArr = movies.filter(movie => movie.plot !== 'N/A');
        localStorage.setItem('movies', JSON.stringify(moviesArr));

        movieList.style.justifyContent = 'flex-start';
        renderMovies(moviesArr);
        searchForm.reset();
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
        const words = movie.plot.split(' ');
        const truncatedWords = words.slice(0, 30);
        const truncatedText = truncatedWords.join(' ') + '...';

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
                        ${isWatchlistPage ? 
                            `<span class="remove" data-id="${movie.id}">
                                <i class="fa-solid fa-circle-minus"></i> Watchlist
                            </span>` 
                        : 
                            `<span class="add" data-id="${movie.id}">
                                <i class="fa-solid fa-circle-plus"></i> Watchlist
                            </span>`
                        }
                    </div>

                    <p class="movie-description">
                    ${words.length < 30 ? movie.plot : truncatedText}
                    </p>
                </div>
            </div>

            ${index !== movies.length - 1 ? '<hr>' : ''}
        `
    }).join(' ');

    if (document.URL.includes('index.html')) {
        movieList.innerHTML = moviesHtml;
    } else if (document.URL.includes('watchlist.html')) {
        watchlist.innerHTML = moviesHtml;
    }
}

function addMovieToWatchlist(movieID) {
    const moviesArr = JSON.parse(localStorage.getItem('movies'));

    if (!localStorage.getItem('watchlist')) {
        localStorage.setItem('watchlist', JSON.stringify([]));
    }

    let moviesInLocalStorage = JSON.parse(localStorage.getItem('watchlist'));
    
    const targetMovie = moviesArr.filter(movie => movie.id === movieID)[0];

    moviesInLocalStorage.push(targetMovie);

    localStorage.setItem('watchlist', JSON.stringify(moviesInLocalStorage));
}

function removeMovieFromWatchlist(movieID) {
    let watchlistInLocalStorage = JSON.parse(localStorage.getItem('watchlist'));
    const targetMovie = watchlistInLocalStorage.filter(movie => movie.id === movieID)[0];

    watchlistInLocalStorage = watchlistInLocalStorage.filter(movie => movie.id !== targetMovie.id);
    // console.log(watchlistInLocalStorage);
    localStorage.setItem('watchlist', JSON.stringify(watchlistInLocalStorage));
    renderMovies(watchlistInLocalStorage);
}