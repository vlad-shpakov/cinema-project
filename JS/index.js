 import { getMovieById } from "./api.js";

const filmsId = [
    "tt5040012","tt29623480","tt0104224","tt15239678","tt22022452", 
    "tt12037194","tt9218128","tt18412256","tt11389872"  
];


const filmGroups = _.chunk(filmsId, 3);

let currentPage = 1;
const filmGrid = document.querySelector(".film-grid")
function showFilms(){
 
    filmGroups[currentPage - 1].forEach((filmId) => {

        getMovieById(filmId).then(movie => {
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
});
});
}
showFilms()


const loadButton = document.getElementById("charger-plus") 

loadButton.addEventListener("click", () => {
   if (currentPage < filmGroups.length) {
    currentPage++;
    showFilms();
   }
})


