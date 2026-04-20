import handleAuthCheck from "./utils/auth.js";

document.addEventListener('DOMContentLoaded', function () {
    handleAuthCheck();
    new Modal(document.querySelector('body'))
    window.addEventListener('resize', handleResize)
});

class Modal {
    constructor(element) {
        this.element = element

        let aside = document.createElement('aside')
        aside.setAttribute('class', 'modal')
        aside.setAttribute('aria-hidden', 'true')
        aside.setAttribute('id', 'modal')
        aside.setAttribute('aria-modal', 'false')
        aside.setAttribute('role', 'dialog')
        aside.style.display = 'none'
        let asideWrapper = document.createElement('div')
        asideWrapper.setAttribute('class', 'modal-wrapper')
        asideWrapper.style.height = (window.innerHeight * 0.6568) + 'px'
        asideWrapper.style.width = (window.innerWidth * 0.5) + 'px'
        let content = document.createElement('div')
        content.setAttribute('class', 'modal-content')
        let backmodal = document.createElement('div')
        backmodal.setAttribute('class', 'backmodal')
        let backmodalimg = document.createElement('img')
        backmodalimg.setAttribute('src', '../img/backmodal.png')
        let h2 = document.createElement('h2')
        h2.textContent = "Carte de l'efrei"
        let conteneurImg = document.createElement('div')
        conteneurImg.setAttribute('class', 'carte-conteneur')
        let imgCarte = document.createElement('img')
        imgCarte.setAttribute('src', '../img/carte_efrei.png')
        imgCarte.setAttribute('alt', 'Carte de l\'efrei')

        this.element.appendChild(aside)
        aside.appendChild(asideWrapper)
        asideWrapper.appendChild(content)
        content.appendChild(backmodal)
        content.appendChild(h2)
        content.appendChild(conteneurImg)
        conteneurImg.appendChild(imgCarte)
        backmodal.appendChild(backmodalimg)

        this.openBtn = document.querySelector('.open-modal')
        this.openBtn.addEventListener('click', this.openModal)
        aside.addEventListener('click', (e) => {
            if(!asideWrapper.contains(e.target)) {
                this.closeModal()
            }
        })
        backmodal.addEventListener('click', this.closeModal)
        window.addEventListener('resize', this.remesurer)
    }

    openModal() {
        let aside = document.querySelector('.modal')
        aside.style.display = null
        aside.removeAttribute('aria-hidden')
        aside.setAttribute('aria-modal', 'true')

        let asideWrapper = document.querySelector('.modal-wrapper')
        let backmodal = document.querySelector('.backmodal')
        let rto = asideWrapper.offsetWidth
        backmodal.style.right = (((window.innerWidth / 2) - (rto / 2)) + 5) + 'px'
        let heightWindow = window.innerHeight;
        backmodal.style.top = ((heightWindow / 2) - (asideWrapper.offsetHeight / 2) + 20) + 'px'
    }

    closeModal() {
        let aside = document.querySelector('.modal')
        aside.style.display = "none"
        aside.setAttribute('aria-hidden', 'true')
        aside.removeAttribute('aria-modal')
    }

    remesurer() {
        let asideWrapper = document.querySelector('.modal-wrapper')
        asideWrapper.style.height = (window.innerHeight * 0.65) + 'px'
        asideWrapper.style.width = (window.innerWidth * 0.5) + 'px'
        let backmodal = document.querySelector('.backmodal')
        let rto = asideWrapper.offsetWidth
        backmodal.style.right = (((window.innerWidth / 2) - (rto / 2)) + 5) + 'px'
        let heightWindow = window.innerHeight;
        backmodal.style.top = ((heightWindow / 2) - (asideWrapper.offsetHeight / 2) + 20) + 'px'
    }
}

const handleResize = () => {
    let carteImage = document.querySelector('.carte img');
    let sectionCarte = document.querySelector('.carte');
    let width = sectionCarte.offsetWidth * 0.8;
    carteImage.style.width = width + 'px';
    let height = width * 0.6568;
    carteImage.style.height = height + 'px';
}