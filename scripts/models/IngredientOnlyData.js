class IngredientOnlyData {
    /**
     * @param {object} data
     */
    constructor(data) {
        this._ingredient = data.ingredient
    }

    get ingredient() {
        return this._ingredient
    }

}