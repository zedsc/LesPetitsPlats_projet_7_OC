import {recipes} from '/data/recipes.js'

class AppRecipe {
    constructor() {
        this.$recipeGallery = document.getElementById('recipe-gallery')
        this.$comboboxSection = document.querySelector('.combobox')
    }

    async main() {

        // Creating a new array of objects from the recipes array.
        const recipesMapped = recipes.map(recipe => new RecipeData(recipe))
        const combobox = recipes.map(recipe => new ComboBoxMain(recipe))
        
        // GET, SORT AND RETURN APPLIANCES INSIDE COMBOBOX //
        const getAppliances = combobox.map(recipe => recipe.getApplianceOnly())
        const appliancesSorted = ManageArray.concatSortArray(getAppliances)

        appliancesSorted
        .map(appliance => new ComboBoxElt(appliance))
        .map(appliance => appliance.addAppliancesList())

        // GET, SORT AND RETURN INGREDIENTS INSIDE COMBOBOX //
        const getIngredients = combobox.map(recipe => recipe.getIngredientOnly())
        const ingredientsSorted = ManageArray.concatSortArray(getIngredients)

        ingredientsSorted
        .map(ingredient => new ComboBoxElt(ingredient))
        .map(ingredient => ingredient.addIngredientsList())

        // GET, SORT AND RETURN USTENSILS INSIDE COMBOBOX //
        const getUstensils = combobox.map(recipe => recipe.getUstensilOnly())
        const ustensilsSorted = ManageArray.concatSortArray(getUstensils)

        ustensilsSorted
        .map(ustensil => new ComboBoxElt(ustensil))
        .map(ustensil => ustensil.addUstensilsList())

        // RECIPES CARDS //
        recipesMapped
        .map(recipe => new RecipeCard(recipe))
        .map(recipe => recipe.createRecipeCard())

        // RESEARCH + TAGS //
        const searchBar = new ResearchFilter(recipes)
        searchBar.researchMain()
        searchBar.researchIngredients()
        searchBar.researchAppliances()
        searchBar.researchUstensils()
    }
}

const appRecipe = new AppRecipe()
appRecipe.main()