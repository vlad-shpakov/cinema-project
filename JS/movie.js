import { getMovieById } from "./api.js";

/// Récupère l'identifiant du film dans l'URL 

const filmId = new URLSearchParams(location.search).get("id");
const movieCon = document.querySelector("#movie")

// Récupère les informations du film depuis OMDb
getMovieById(filmId).then(movie => {
    



        const film = document.createElement("div");

        const release = document.createElement("p")
        release.textContent = "Date de sortie: " + movie.Released

        const rate = document.createElement ("p")
        rate.textContent = "IMDb: " + movie.imdbRating
        
        const poster = document.createElement("img");
        poster.src = movie.Poster;

        const title = document.createElement ("h2")
        title.textContent = movie.Title

        const genre = document.createElement ("p")
        genre.textContent = movie.Genre

        const actor = document.createElement ("p")
        actor.textContent = movie.Actors


        const resume = document.createElement("p");
        resume.textContent = movie.Plot;


        film.appendChild(title)
        film.appendChild(rate)
        film.appendChild(release)
        film.appendChild(poster)  
         film.appendChild(genre)
        film.appendChild(actor)      
        film.appendChild(resume)        
        movieCon.appendChild(film);
});
