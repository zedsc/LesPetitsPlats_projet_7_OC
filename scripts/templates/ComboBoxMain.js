class ComboBoxMain {
    /**
     * @param {object} recipe 
     */
     constructor(recipe) {
        this._recipe = recipe
    }

    /**
     * Each function returns the ingredients or appliances or ustensils from the recipe.
     * @returns An array.
     * For ingredients, returns an array of objects.
     */
    getApplianceOnly() {
        const appliances = this._recipe.appliance
      
        return appliances
    }

    getIngredientOnly() {
        const ingredients = this._recipe.ingredients
        const ingredientsObject = ingredients
        .map(composant => new IngredientOnlyData(composant))
        .map(ingredient => {return Object.values(ingredient)})

        return ingredientsObject
    }

    getUstensilOnly() {
        const ustensils = this._recipe.ustensils

        return ustensils
    }
}

