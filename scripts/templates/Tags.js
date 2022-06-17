class Tags {
    constructor(element, list) {
        this._element = element
        this._list = list

        this.$tagSection = document.querySelector('.tags-section')
        this.$btnWrapper = document.createElement('button')
        this.$btnWrapper.classList.add('tag')
    }

    createTag() {
        this.$btnWrapper.classList.add('tag__'+this._list)
        const fullListsOptions = Array.from(document.querySelectorAll('.opt__'+this._list))
       
        const option = fullListsOptions.find(elt => elt.textContent === this._element)

        option.addEventListener('click', () => {
            const tagContent = `
                <p class="tag__txt tag__txt--"${this._list}>${this._element}</p>
                <span class="fa-regular fa-circle-xmark"></span>
            `

            this.$tagSection.insertAdjacentElement('beforeend', this.$btnWrapper)
            this.$btnWrapper.insertAdjacentHTML('afterbegin', tagContent)

            this.removeTag()

            return this.$btnWrapper
        })
    }

    removeTag() {
        this.$btnWrapper
        .querySelector('.fa-circle-xmark')
        .addEventListener('click', () => {
            this.$btnWrapper.remove()
        })

    }
}