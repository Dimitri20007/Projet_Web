export default function handleAuthCheck() {
    // Met a jour le lien Register selon la session conservee en local.
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
    } else {
        registerLink.textContent = 'Register';
        span.textContent = '👤';
        registerLink.appendChild(span);
    }
}