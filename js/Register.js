document.addEventListener('DOMContentLoaded', function () {
    handleCheckAuthRegisterPage();
    const registerLink = document.querySelector('.register-link');
    
    const registerSection = document.querySelector('.register');
    const signInSection = document.querySelector('.sign_in');
    const forgotPasswordSection = document.querySelector('.forgot_password');
    const infoUserSection = document.querySelector('.info_user');

    handleToggle(registerSection, signInSection, forgotPasswordSection, infoUserSection);

    const registerButton = registerSection.querySelector('#register_button');
    if ( registerButton ) {
        registerButton.addEventListener('click', function (e) {
            e.preventDefault();
            handleRegister(registerSection, infoUserSection);
        });
    }

    const signInButton = signInSection.querySelector('#sign_in_button');
    if ( signInButton ) {
        signInButton.addEventListener('click', function (e) {
            e.preventDefault();
            handleSignIn(signInSection, infoUserSection);
        });
    }

    const handleForgotPasswordButton = forgotPasswordSection.querySelector('#forgot_password_button');
    if ( handleForgotPasswordButton ) {
        handleForgotPasswordButton.addEventListener('click', function (e) {
            e.preventDefault();
            handleForgotPassword(forgotPasswordSection, signInSection);
        });
    }

    const deconnectButton = infoUserSection.querySelector('.button_logout');
    if ( deconnectButton ) {
        deconnectButton.addEventListener('click', function () {
            localStorage.setItem('connected', 'false');
            const usernameSpan = infoUserSection.querySelector('#display_username');
            const emailSpan = infoUserSection.querySelector('#display_email');
            usernameSpan.textContent = '';
            emailSpan.textContent = '';
            infoUserSection.style.display = 'none';
            signInSection.style.display = 'block';
            registerLink.textContent = 'Register';
            const span = document.createElement('span');
            span.textContent = '👤';
            registerLink.appendChild(span);
        });
    }

    const showInfoButton = infoUserSection.querySelector('.button_show_info');
    if (showInfoButton) {
        showInfoButton.addEventListener('click', function () {
            const info = infoUserSection.querySelector('.info');
            info.style.display = 'block';
            showInfoButton.style.display = 'none';
        });
    }

    const hideInfoButton = infoUserSection.querySelector('.button_hide_info');
    if (hideInfoButton) {
        hideInfoButton.addEventListener('click', function () {
            const info = infoUserSection.querySelector('.info');
            info.style.display = 'none';
            showInfoButton.style.display = 'block';
        });
    }

})

const handleCheckAuthRegisterPage = () => {
    const connected = localStorage.getItem('connected');
    const registerLink = document.querySelector('.register-link');
    const span = document.querySelector('.register-link span');
    const registerSection = document.querySelector('.register');
    const signInSection = document.querySelector('.sign_in');
    const forgotPasswordSection = document.querySelector('.forgot_password');
    const infoUserSection = document.querySelector('.info_user');

    if(connected === 'true') {
        registerLink.textContent = 'Mon compte';
        span.textContent = '👤';
        registerLink.appendChild(span);
        registerSection.style.display = 'none';
        signInSection.style.display = 'none';
        forgotPasswordSection.style.display = 'none';
        infoUserSection.style.display = 'block';
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        const usernameSpan = infoUserSection.querySelector('#display_username');
        const emailSpan = infoUserSection.querySelector('#display_email');
        usernameSpan.textContent = storedUserData.username;
        emailSpan.textContent = storedUserData.email;
        const info = infoUserSection.querySelector('.info');
        info.style.display = 'block';
        const buttonShowInfo = infoUserSection.querySelector('.button_show_info');
        if (buttonShowInfo) {
            buttonShowInfo.style.display = 'none';
        }
    } else {
        registerLink.textContent = 'Register';
        span.textContent = '👤';
        registerLink.appendChild(span);
        registerSection.style.display = 'none';
        signInSection.style.display = 'block';
        forgotPasswordSection.style.display = 'none';
        infoUserSection.style.display = 'none';
    }
}

const handleForgotPassword = (forgotPasswordSection, signInSection) => {
    const emailInput = forgotPasswordSection.querySelector('#email_forgot');
    const passwordInput = forgotPasswordSection.querySelector('#password_forgot');
    const errorMessage = forgotPasswordSection.querySelector('.error-message');
    if(!emailInput.value || !passwordInput.value) {
        errorMessage.textContent = 'Veuillez remplir tous les champs.';
        return;
    }
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if(storedUserData && storedUserData.email === emailInput.value) {
        storedUserData.password = passwordInput.value;
        localStorage.setItem('userData', JSON.stringify(storedUserData));
        forgotPasswordSection.style.display = 'none';
        signInSection.style.display = 'block';
    } else {
        errorMessage.textContent = 'Email non trouvé.';
    }
}

const handleSignIn = (signInSection, infoUserSection) => {
    const emailInput = signInSection.querySelector('#email_sign_in');
    const passwordInput = signInSection.querySelector('#password_sign_in');
    const errorMessage = signInSection.querySelector('.error-message');
    const registerLink = document.querySelector('.register-link');
    const buttonShowInfo = infoUserSection.querySelector('.button_show_info');
    if(!emailInput.value || !passwordInput.value) {
        errorMessage.textContent = 'Veuillez remplir tous les champs.';
        return;
    }
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if(storedUserData && storedUserData.email === emailInput.value && storedUserData.password === passwordInput.value) {
        localStorage.setItem('connected', 'true');
        const info = infoUserSection.querySelector('.info');
        info.style.display = 'block';
        signInSection.style.display = 'none';
        const usernameSpan = infoUserSection.querySelector('#display_username');
        const emailSpan = infoUserSection.querySelector('#display_email');
        usernameSpan.textContent = storedUserData.username;
        emailSpan.textContent = storedUserData.email;
        infoUserSection.style.display = 'block';
        registerLink.textContent = 'Mon compte';
        const span = document.createElement('span');
        span.textContent = '👤';
        registerLink.appendChild(span);
        if (buttonShowInfo) {
            buttonShowInfo.style.display = 'none';
        }
    } else {
        errorMessage.textContent = 'Email ou mot de passe incorrect.';
    }
}

const handleRegister = (registerSection, infoUserSection) => {
    const usernameInput = registerSection.querySelector('#username');
    const emailInput = registerSection.querySelector('#email');
    const passwordInput = registerSection.querySelector('#password');
    const errorMessage = registerSection.querySelector('.error-message');
    const registerLink = document.querySelector('.register-link');
    const buttonShowInfo = infoUserSection.querySelector('.button_show_info');
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
    localStorage.setItem('connected', 'true');
    const info = infoUserSection.querySelector('.info');
    info.style.display = 'block';
    registerSection.style.display = 'none';
    const usernameSpan = infoUserSection.querySelector('#display_username');
    const emailSpan = infoUserSection.querySelector('#display_email');
    usernameSpan.textContent = userData.username;
    emailSpan.textContent = userData.email;
    infoUserSection.style.display = 'block';
    registerLink.textContent = 'Mon compte';
    const span = document.createElement('span');
    span.textContent = '👤';
    registerLink.appendChild(span);
    if (buttonShowInfo) {
        buttonShowInfo.style.display = 'none';
    }
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