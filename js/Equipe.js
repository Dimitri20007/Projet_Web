import handleAuthCheck from "./utils/auth.js";

document.addEventListener('DOMContentLoaded', function () {
    // Garde l'etat du menu synchronise avec la connexion.
    handleAuthCheck();

    // La carte se retourne au clic et au clavier pour rester accessible.
    const teacherCards = document.querySelectorAll('.teacher-card');
    teacherCards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.classList.toggle('is-flipped');
            }
        });
    });
});