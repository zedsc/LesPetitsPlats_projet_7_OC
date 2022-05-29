
import {recipes} from '/data/recipes.js'

class AppRecipe {
    constructor() {
        this.$recipeGallery = document.getElementById('recipe-gallery')
    }

    async main() {

        const recipesMapped = recipes.map(recipe => new RecipeData(recipe))

        const recipesCards = recipesMapped.map(recipe => new RecipeCard(recipe))

        const recipesDOM = recipesCards.map(recipe => recipe.createRecipeCard())
        
        console.log(recipesDOM)
        return recipesDOM
    }
}

const appRecipe = new AppRecipe()
appRecipe.main()