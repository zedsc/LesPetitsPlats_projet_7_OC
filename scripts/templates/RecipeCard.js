class RecipeCard {
    /**
     * @param {object} recipe 
     */
    constructor(recipe) {
        this._recipe = recipe

        this.$recipeArticle = document.createElement('article')
        this.$recipeArticle.classList.add('recipe-card')
        this.$recipeGallery = document.getElementById('recipe-gallery')
    }

   /**
    * It creates a recipe card and inserts it into the DOM.
    * @returns The article recipe card is being returned.
    */
    createRecipeCard() {
        const recipeCard = `
            <div class="recipe-container-img">
            <img src="" alt="" class="recipde-card__img" title="">
            </div>
            <div class="recipe-content">
                <div class="recipe-heading">
                    <h1 class="recipe-heading__title">${this._recipe.name}</h1>
                    <p class="recipe-heading__timer"><span class="fa-regular fa-clock"></span> ${this._recipe.time} min</p>
                </div>
                <div class="recipe-info">
                    <div class="recipe-info__ingredients">
            
                    </div>
                    <p class="recipe-info__description">
                    ${this._recipe.description}
                    </p>
                </div>
            </div>
        `

        this.$recipeGallery.insertAdjacentElement('beforeend', this.$recipeArticle)
        this.$recipeArticle.insertAdjacentHTML('afterbegin', recipeCard)

        this.addIngredients()

        return this.$recipeArticle
    }

   /**
    * It takes the ingredients from the recipe object, creates an array of ingredient cards, and then
    * inserts them into the DOM
    */
    addIngredients() {
        const ingredientsCards = this._recipe.ingredients
        .map(composant => new IngredientData(composant))
        .filter(Boolean)
        .map(composant => new IngredientCard(composant))

        const ingredientsDOM = ingredientsCards.map(composant => composant.createIngredientsDOM()).join("")
        
        const $infoIngredients = this.$recipeArticle.querySelector('.recipe-info__ingredients')
        $infoIngredients.insertAdjacentHTML('afterbegin', ingredientsDOM)
    }
}