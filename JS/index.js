const filmsId = [
    "tt5040012","tt29623480","tt0104224","tt15239678","tt22022452", 
    "tt12037194","tt9218128","tt18412256","tt11389872"  
];

const filmGroups = _.chunk(filmsId, 3);

let currentPage = 1;
const filmGrid = document.querySelector(".film-grid")
function showFilms(){
 
    filmGroups[currentPage - 1].forEach((filmId) => {
        const film = document.createElement("div");
        film.textContent = filmId;
        filmGrid.appendChild(film);
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


 