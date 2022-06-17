class IngredientCard {
    /**
     * @param {object} ingredients
     */
    constructor(ingredients) {
        this._ingredients = ingredients
    }

    createIngredientsDOM() {
        if (this._ingredients.quantity && this._ingredients.unit) {
        return `
            <div class="recipe-composant">
                <p class="recipe-composant__ingredient">${this._ingredients.ingredient} :</p>
                <p class="recipe-composant__quantity">${this._ingredients.quantity}</p>
                <p class="recipe-composant__unit">${this._ingredients.unit}</p>
            </div>
        `
        } else if (this._ingredients.quantity) {
            return `
            <div class="recipe-composant">
                <p class="recipe-composant__ingredient">${this._ingredients.ingredient} :</p>
                <p class="recipe-composant__quantity">${this._ingredients.quantity} </p>
            </div>
        `
        } else {
            return `
            <div class="recipe-composant">
                <p class="recipe-composant__ingredient">${this._ingredients.ingredient}</p>
            </div>
        `
        }
    }
}