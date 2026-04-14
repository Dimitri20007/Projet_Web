document.addEventListener('DOMContentLoaded', function () {
    const registerSection = document.querySelector('.register');
    const signInSection = document.querySelector('.sign_in');
    const forgotPasswordSection = document.querySelector('.forgot_password');
    const infoUserSection = document.querySelector('.info_user');

    const signInLinks = document.querySelectorAll('.sign_in_link');
    const registerLinks = document.querySelectorAll('.register_link');
    const forgotPasswordLinks = document.querySelectorAll('.forgot_password_link');

    signInLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            registerSection.style.display = 'none';
            signInSection.style.display = 'block';
            forgotPasswordSection.style.display = 'none';
            infoUserSection.style.display = 'none';
        });
    });

    registerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            registerSection.style.display = 'block';
            signInSection.style.display = 'none';
            forgotPasswordSection.style.display = 'none';
            infoUserSection.style.display = 'none';
        });
    });

    forgotPasswordLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            registerSection.style.display = 'none';
            signInSection.style.display = 'none';
            forgotPasswordSection.style.display = 'block';
            infoUserSection.style.display = 'none';
        });
    });

})