// Crée un bouton pour remonter en haut de la page
export function backToTop() {
    const buttonTop = document.querySelector("#backToTop");

    if (!buttonTop) return;

    buttonTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}