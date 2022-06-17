class ElementList {
    /**
     * @param {string} element
     */
    constructor(element) {
        this._element = element
    }

    createAppliancesList() {
        return `
        <li class="datalist__opt opt__appliance" data-cat="appliances" tabindex="0">${this._element}</li>
        `
    }

    createIngredientsList() {
        return `
        <li class="datalist__opt opt__ingredient" data-cat="ingredients" tabindex="0">${this._element}</li>
        `
    }

    createUstensilsList() {
        return `
        <li class="datalist__opt opt__ustensil" data-cat="ustensiles" tabindex="0">${this._element}</li>
        `
    }
}