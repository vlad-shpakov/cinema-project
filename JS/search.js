// Importe la fonction qui communique avec l'API OMDb
import { searchMovie } from "./api.js";

// Récupère les éléments HTML nécessaires à la recherche
const input = document.querySelector("#search");
const display = document.querySelector("#movies");
const button = document.querySelector("#loadMore");

// Initialise le numéro de la page des résultats
let page = 1;
let query = "";

// Initialise les résultats à charger à false
let noMoreResults = false

// Message quand plus aucun films à afficher
const noMoreMovies = document.createElement("p");

// Parcourt chaque films et les affichent
function displayMovie(data) {
    data.Search.forEach(movie => {

    // Crée la carte qui représentera le film
    const movieCard = document.createElement("article");

    // Crée l'image du poster
    const moviePoster = document.createElement("img");
    moviePoster.setAttribute("src", movie.Poster);
    moviePoster.setAttribute("alt", `Affiche du film : ${movie.Title}`);

    // Crée le titre du film
    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.Title;

    // Crée le lien vers la page de détail du film
    const movieLink = document.createElement("a");
    movieLink.setAttribute("href", `movie.html?id=${movie.imdbID}`);
    movieLink.textContent = "En savoir plus";

    // Assemble les éléments dans la carte du film
    movieCard.append(moviePoster);
    movieCard.append(movieTitle);
    movieCard.append(movieLink);

    // Ajoute la carte terminée dans la page
    display.append(movieCard);
    })
};

// Écoute chaque modification de la barre de recherche
input.addEventListener("input", () => {

    // Récupère ce que l'utilisateur vient d'écrire
    query = input.value;

    // Réinitialise la pagination lors d'une nouvelle recherche
    page = 1;

    // Efface le message du chargement de films
    noMoreMovies.textContent = "";

    // Réinitialise le bouton quand l'utilisateur commence une nouvelle recherche
    noMoreResults = false;

    // Arrête l'exécution si l'utilisateur n'a rien écrit
    if (query == "" ){
        display.innerHTML = "";
        return;
    }

    // Envoie la recherche à l'API et attend les résultats
    searchMovie(query, page)
        .then(data => {

            // Renvoie un message d'erreur si aucun films n'a été trouvé
            if (data.Response == "False") {
                display.innerHTML = "";
                display.textContent = "Aucun film ne correspond à votre recherche";
                return;
            }

            // Vide le contenu du conteneur après chaque nouvelle saisie
            display.innerHTML = "";
            console.log("l'affichage à été vidée");

            displayMovie(data);
        })
        // Gère les erreurs de la requête
        .catch(error => {
            console.log(error);
            display.textContent = "Une erreur est survenue lors de votre recherche";
        });
});

// Crée un bouton pour charger plus
button.addEventListener("click", () => {

    // Récupère ce que l'utilisateur vient d'écrire
    query = input.value;

    // Arrête l'exécution si l'utilisateur n'a rien écrit
    if(query == "") {
        return;
    }

    // Vérifie s'il y a d'autres résultats à afficher
    if(noMoreResults) {
        return;
    }

    // Affiche les pages suivantes sans effacer les anciens résultats
    page = page + 1;

    // Envoie la recherche à l'API et attend les résultats
    searchMovie(query, page)
        .then(data => {

            // Renvoie un message d'erreur si aucun films n'a été trouvé
            if (data.Response == "False") {
                noMoreResults = true
                noMoreMovies.textContent = "Il n'y a pas plus de résultats à charger";
                display.after(noMoreMovies);
                return;
                }

            displayMovie(data);
        })
        // Gère les erreurs de la requête
        .catch(error => {
            console.log(error);
            display.textContent = "Une erreur est survenue lors de votre recherche";
        });
}); 

// Crée un bouton pour remonter en haut de la page
import { backToTop } from "./backToTop.js";

backToTop();