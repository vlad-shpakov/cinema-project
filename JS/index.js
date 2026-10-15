 import { getMovieById } from "./api.js";

// Liste des films sur la page d'accueil
const filmsId = [
    "tt29355505","tt33764258","tt12042730","tt37287335", "tt33612209","tt22084616", 
    "tt26443616","tt27047903","tt28650488","tt11378946", "tt26657236", "tt32612507"
];


const filmGroups = _.chunk(filmsId, 3);

let currentPage = 1;
const filmGrid = document.querySelector(".film-grid")

// Fonction qui récupère les données des films et crée les cartes HTML
function showFilms(){
 
    filmGroups[currentPage - 1].forEach((filmId) => {

        getMovieById(filmId)
            .then(movie => {

                const film = document.createElement("div");
                film.textContent = movie.Title;

                const poster = document.createElement("img");
                poster.src = movie.Poster;
                
                const link = document.createElement("a");
                link.href = `movie.html?id=${filmId}`;
                link.textContent = "Voir plus"

                const resume = document.createElement("p");
                resume.textContent = movie.Plot.slice(0,100) + "...";
                    
                film.appendChild(poster)
                film.appendChild(resume)
                film.appendChild(link)
                filmGrid.appendChild(film);
            })

            // Gère les erreurs de la requête
            .catch(error => {
                console.log(error);
                filmGrid.textContent = "Impossible de charger les films pour le moment. Vérifiez votre connexion et réessayez";
            });
    });
}
showFilms()

// Affiche les 3 films au click
const loadButton = document.getElementById("charger-plus") 

loadButton.addEventListener("click", () => {
   if (currentPage < filmGroups.length) {
    currentPage++;
    showFilms();
   }
})

// Crée un bouton pour remonter en haut de la page
import { backToTop } from "./backToTop.js";

backToTop();

