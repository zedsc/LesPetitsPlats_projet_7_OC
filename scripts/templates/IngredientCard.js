class IngredientCard {
    /**
     * @param {object} ingredients
     */
    constructor(ingredients) {
        this._ingredients = ingredients
    }

 /**
  * If the ingredient has a quantity and a unit, return the ingredient, quantity and unit. 
  * If the ingredient has a quantity but no unit, return the ingredient and quantity. 
  * If the ingredient has no quantity or unit, return the ingredient.
  * @returns a string of HTML code.
  */
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