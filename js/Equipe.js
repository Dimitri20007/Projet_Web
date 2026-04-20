import handleAuthCheck from "./utils/auth.js";

document.addEventListener('DOMContentLoaded', function () {
    handleAuthCheck();

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