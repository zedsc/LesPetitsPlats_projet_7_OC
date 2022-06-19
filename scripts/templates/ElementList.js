class ElementList {
    /**
     * @param {string} element
     */
    constructor(element) {
        this._element = element
    }

    /**
     * It creates a list item with a class depending if it's an ingredient, appliance or ustensil category.
     * @returns a string of HTML code.
     */
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