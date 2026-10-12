// Fonction qui communique avec OMDb pour récupérer les données des films
export function searchMovie(movie, page) {
    const url = `https://www.omdbapi.com/?apikey=ce52347d&s=${movie}&page=${page}&type=movie`;

     return fetch(url)
        .then(response => response.json());
}




export function getMovieById(filmId) {
    const url = `https://www.omdbapi.com/?apikey=ce52347d&i=${filmId}&plot=full`;

     return fetch(url)
        .then(response => response.json());
}