class ComboBoxElt {
    /**
     * @param {string} element
     */
     constructor(element) {
        this._element = element
    }

    addAppliancesList() {
        const $applianceList = document.getElementById('appliance-list')
       
        const appliancesModel = new ElementList(this._element)
 
        const appliancessCombobox = appliancesModel.createAppliancesList()
        $applianceList.insertAdjacentHTML('beforeend', appliancessCombobox)

        const list = "appliance"
        const tag = new Tags(this._element, list)
        tag.createTag()

        return appliancesModel
     }

     addIngredientsList() {
        const $ingredientList = document.getElementById('ingredient-list')
       
        const ingredientsModel = new ElementList(this._element)
 
        const ingredientsCombobox = ingredientsModel.createIngredientsList()
        $ingredientList.insertAdjacentHTML('beforeend', ingredientsCombobox)

        const list = "ingredient"
        const tag = new Tags(this._element, list)
        tag.createTag()

        return ingredientsModel
     }

     addUstensilsList() {
        const $ustensilList = document.getElementById('ustensil-list')
       
        const ustensilsModel = new ElementList(this._element)
 
        const ustensilsCombobox = ustensilsModel.createUstensilsList()
        $ustensilList.insertAdjacentHTML('beforeend', ustensilsCombobox)

        const list = "ustensil"
        const tag = new Tags(this._element, list)
        tag.createTag()

        return ustensilsModel
     }
}
