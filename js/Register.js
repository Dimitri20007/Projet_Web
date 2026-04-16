document.addEventListener('DOMContentLoaded', function () {
    
    const registerSection = document.querySelector('.register');
    const signInSection = document.querySelector('.sign_in');
    const forgotPasswordSection = document.querySelector('.forgot_password');
    const infoUserSection = document.querySelector('.info_user');

    handleToggle(registerSection, signInSection, forgotPasswordSection, infoUserSection);

    const registerButton = registerSection.querySelector('.register_button');
    registerButton.addEventListener('click', function (e) {
        e.preventDefault();
        handleRegister(registerSection, infoUserSection);
    });

    const signInButton = signInSection.querySelector('.sign_in_button');
    signInButton.addEventListener('click', function (e) {
        e.preventDefault();
        handleSignIn(signInSection, infoUserSection);
    });

})

const handleSignIn = (signInSection, infoUserSection) => {
    const emailInput = signInSection.getElementById('email_sign_in');
    const passwordInput = signInSection.getElementById('password_sign_in');
    const errorMessage = signInSection.querySelector('.error-message');
    if(!emailInput.value || !passwordInput.value) {
        errorMessage.textContent = 'Veuillez remplir tous les champs.';
        return;
    }
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if(storedUserData && storedUserData.email === emailInput.value && storedUserData.password === passwordInput.value) {
        const info = document.querySelector('.info');
        info.style.display = 'block';
        signInSection.style.display = 'none';
        const usernameSpan = document.getElementById('display_username');
        const emailSpan = document.getElementById('display_email');
        usernameSpan.textContent = storedUserData.username;
        emailSpan.textContent = storedUserData.email;
        infoUserSection.style.display = 'block';
    } else {
        errorMessage.textContent = 'Email ou mot de passe incorrect.';
    }
}

const handleRegister = (registerSection, infoUserSection) => {
    const usernameInput = registerSection.getElementById('username');
    const emailInput = registerSection.getElementById('email');
    const passwordInput = registerSection.getElementById('password');
    const errorMessage = registerSection.querySelector('.error-message');
    if(!usernameInput.value || !emailInput.value || !passwordInput.value) {
        errorMessage.textContent = 'Veuillez remplir tous les champs.';
        return;
    }
    // Simulation de l'inscription réussie
    const userData = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    const info = document.querySelector('.info');
    info.style.display = 'block';
    registerSection.style.display = 'none';
    const usernameSpan = document.getElementById('display_username');
    const emailSpan = document.getElementById('display_email');
    usernameSpan.textContent = userData.username;
    emailSpan.textContent = userData.email;
    infoUserSection.style.display = 'block';
}

const handleToggle = (registerSection, signInSection, forgotPasswordSection, infoUserSection) => {

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
}