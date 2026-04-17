import Carousel from './utils/carousel.js';
import handleAuthCheck from "./utils/auth.js";

document.addEventListener('DOMContentLoaded', function () {
    handleAuthCheck();
    new Carousel(document.querySelector('.carousel1'), {
        slideToScroll: 1,
        slideVisible: 2,
        loop: true
    })

    // EFFET AU SCROLL

    const ratio = .1
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: .1
    }


    const handleIntesect = function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > ratio) {
                entry.target.classList.add('reveal-visible')
                observer.unobserve(entry.target)
            }
        })
    }

    const observer = new IntersectionObserver(handleIntesect, options);
    let reveal = document.querySelectorAll('[class*="reveal-"]')
    for (let i = 0; i < reveal.length; i++) {
        observer.observe(reveal[i])
    }

})