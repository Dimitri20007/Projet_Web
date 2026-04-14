export default class Carousel {

    constructor(element, options = {}) { // options par défaults vides
        this.element = element
        this.options = Object.assign({}, { // assigner à l'object, 1 les propriété qu'il aura, 2 les propriété qu'on lui passe
            slideToScroll: 1,
            slideVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children) // convertir en nodeListles enfants de element
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        this.items = children.map((child) => { // syntaxe ECMASCRIPT6 pour que this fasse réf à la function
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
        let ratio = this.items.length / this.options.slideVisible
        this.container.style.width = (ratio * 100) + '%'
        this.items.forEach(item => item.style.width = ((100 / this.options.slideVisible) / ratio) + '%')
    }

    createNavigation() {
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
        this.goToItem(this.currentItem + this.options.slideToScroll)
    }

    prev() {
        this.goToItem(this.currentItem - this.options.slideToScroll)
    }

    goToItem(index) {
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
        this.moveCallbacks.push(cb)
    }

    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

}