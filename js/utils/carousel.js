export default class Carousel {

    constructor(element, options = {}) {
        this.element = element
        // Fusionne les options par defaut avec celles passees par la page.
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1,
            loop: false
        }, options)
        // Convertit les enfants en tableau pour les manipuler facilement.
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        // Chaque element enfant devient une slide du carrousel.
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(cb => cb(0))
    }


    setStyle() {
        // Dimensionne conteneur et slides selon le nombre d'elements visibles.
        let ratio = this.items.length / this.options.slideVisible
        this.container.style.width = (ratio * 100) + '%'
        this.items.forEach(item => item.style.width = ((100 / this.options.slideVisible) / ratio) + '%')
    }

    createNavigation() {
        // Construit les controles de navigation du carrousel.
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        nextButton.textContent = '>'
        prevButton.textContent = '<'
        if (this.options.loop === true) {
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.items[this.currentItem + this.options.slideVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')
            }
        })
    }

    next() {
        // Passe a la page suivante.
        this.goToItem(this.currentItem + this.options.slideToScroll)
    }

    prev() {
        // Revient a la page precedente.
        this.goToItem(this.currentItem - this.options.slideToScroll)
    }

    goToItem(index) {
        // Gere le bouclage et applique la translation horizontale.
        if (index < 0) {
            index = this.items.length - this.options.slideVisible
        } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slideVisible] === undefined && index > this.currentItem)) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    onMove(cb) {
        // Permet d'ecouter les changements d'index.
        this.moveCallbacks.push(cb)
    }

    createDivWithClass(className) {
        // Helper commun pour garder le constructeur lisible.
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

}