// Fonction qui communique avec OMDb pour récupérer les données des films
export function searchMovie(movie, page) {
    const url = `https://www.omdbapi.com/?apikey=ce52347d&s=${movie}&page=${page}`;

     return fetch(url)
        .then(response => response.json());
}