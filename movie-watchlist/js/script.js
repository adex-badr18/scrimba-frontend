const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');

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

    // console.log(searchResult.Search);

    let movies = await Promise.all(searchResult.Search.map(async (movie) => {
        // return await (await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`)).json();
        const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`);
        const movieObj = await movieResponse.json();

        // return movieObj;
        return {
            title: movieObj.Title,
            runtime: movieObj.Runtime,
            genre: movieObj.Genre,
            plot: movieObj.Plot,
            image: movieObj.Poster,
            rating: movieObj.imdbRating
        };
    }))

    // searchResult.Search.forEach(async (movie) => {
    //     // console.log(movie.imdbID);
    //     const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`);
    //     const movieObj = await movieResponse.json();
    //     movies.push(movieObj);

    // });

    // movies.forEach(movie => console.log(movie))

    console.log(movies);
    // const moviesArr = movies.map(movie => {
    //     return movie.title;
    // return {
    //     title: movie.Title,
    //     runtime: movie.Runtime,
    //     genre: movie.Genre,
    //     plot: movie.Plot,
    //     image: movie.Poster,
    //     rating: movie.imdbRating
    // };
    //     });

    // console.log(moviesArr);
}

function renderMovie(movie) { }