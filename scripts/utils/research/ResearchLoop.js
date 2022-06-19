class ResearchFilter {
    constructor(recipes) {
        this._recipes = recipes;
        this._arrayFiltered = recipes;
        this._arrayFilteredStored = recipes;
        this._arrayFilteredPrevious = recipes;
        this._arrayTags = recipes;
        this._arrayTagsStored = recipes;
        this._arrayTagsPrevious = recipes;
        this._Tags = [];

        this.$searchBar = document.getElementById('research');
        this.$recipeGallery = document.getElementById('recipe-gallery');
        this.$noMatchMsg = document.querySelector('.no-match');
    }

    researchMain() {
        // TAGS MANAGEMENT
        const $tagSection = document.querySelector('.tags-section');
        
        /* Observing the tag section for any changes. If a tag is added, it will filter the recipes
        based on the tag. If a tag is removed, it will filter the recipes based on the remaining
        tags. */
        const that = this;
    
        let observeTags = new MutationObserver(function (mutations) {
            for (let mutation of mutations) {
                // ADDING TAGS
                if (mutation.addedNodes.length) {
                    console.log(mutation, "Added");
                   
                    const $allTags = document.querySelectorAll('.tag__txt');
                    console.log($allTags);

                    const tagsValue = [];
                    
                    $allTags.forEach(tag => tagsValue.push(tag.textContent));

                    console.log(tagsValue);

                    if (tagsValue.length == 1) {
                        that._arrayFilteredStored = that._arrayFiltered;
                        that._arrayFitleredPrevious = that._arrayFiltered;
                        that._Tags = [];
                        for (let recipe of that._arrayFiltered) {
                            if (recipe.name.toLowerCase().includes(tagsValue) ||
                                recipe.description.toLowerCase().includes(tagsValue) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue);
                                }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue) ||
                                recipe.ingredients.some((composant) => {
                                return composant.ingredient.toLowerCase().includes(tagsValue);
                                })) {
                                that._Tags.push(recipe);
                            }
                        }
                        that._arrayFiltered = that._Tags;
                        that._arrayTags = that._Tags;

                    } else if (tagsValue.length >= 2) {
                        that._arrayTagsStored = that._arrayTags;
                        that._arrayTagsPrevious = that._arrayTags;
                        that._arrayTags = [];
                        for (let recipe of that._Tags) {
                            if (recipe.name.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.description.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue.slice(-1));
                                }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ingredients.some((composant) => {
                                return composant.ingredient.toLowerCase().includes(tagsValue.slice(-1));
                                })) {
                                that._arrayTags.push(recipe);
                            }
                        }
                    
                        that._Tags = that._arrayTags;
                        that._arrayFiltered = that._arrayTags;
                    }

                    console.log (that._Tags);
                    console.log(that._arrayFiltered);

                    const cleanGallery = document.querySelectorAll('.recipe-card');
                    cleanGallery.forEach(card => card.remove());
                
                    that._arrayFiltered
                    .map(recipe => new RecipeCard(recipe))
                    .map(recipe => recipe.createRecipeCard());

                    // Setting the list of ingredients, appliances, and utensils. 
                    that.setIngList();
                    that.setAppList();
                    that.setUstList();
                
                // REMONVING TAGS
                } if (mutation.removedNodes.length) {
                    console.log(mutation, "Removed");

                    const $allTags = document.querySelectorAll('.tag__txt');
                    console.log($allTags);

                    const tagsValue = [];
                    
                    $allTags.forEach(tag => tagsValue.push(tag.textContent));

                    console.log(tagsValue);

                    if (tagsValue.length == 1) {
                        that._Tags = [];
                        for (let recipe of that._arrayFilteredStored) {
                            if (recipe.name.toLowerCase().includes(tagsValue) ||
                                recipe.description.toLowerCase().includes(tagsValue) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue);
                                }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue) ||
                                recipe.ingredients.some((composant) => {
                                return composant.ingredient.toLowerCase().includes(tagsValue);
                                })) {
                                that._Tags.push(recipe);
                            }
                        }
                        that._arrayFiltered = that._Tags;
                        that._arrayTags = that._Tags;

                    } else if (tagsValue.length >= 2) {
                        that._arrayTags = [];
                        for (let recipe of that._arrayTagsPrevious) {
                            if (recipe.name.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.description.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue.slice(-1));
                                }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ingredients.some((composant) => {
                                return composant.ingredient.toLowerCase().includes(tagsValue.slice(-1));
                                })) {
                                that._arrayTags.push(recipe);
                            }
                        }
                        that._Tags = that._arrayTags;
                        that._arrayFiltered = that._arrayTags;

                    } else {
                        that._arrayFiltered = that._arrayFilteredStored;
                        that._arrayTags = that._arrayTagsStored;

                        if (that.$noMatchMsg.classList !== 'no-match display-none') {
                            that.$noMatchMsg.classList.add('display-none');
                        }
                    }

                   
                    console.log (that._Tags);
                

                    console.log(that._arrayTags);
                    console.log(that._arrayFiltered);

                    const cleanGallery = document.querySelectorAll('.recipe-card');
                    cleanGallery.forEach(card => card.remove());
                
                    that._arrayFiltered
                    .map(recipe => new RecipeCard(recipe))
                    .map(recipe => recipe.createRecipeCard());

                    // Setting the list of ingredients, appliances, and utensils. 
                    that.setIngList();
                    that.setAppList();
                    that.setUstList();
                }
            }
        });

        observeTags.observe($tagSection, {
            childList: true
        });

        //////////////////////////////////////////
        // MAIN SEARCHBAR MANAGEMENT
        this.$searchBar.addEventListener('input', (eventInput) => {
            const searchString = eventInput.target.value;
            const searchStringLowerCase = searchString.toLowerCase();
            if (searchStringLowerCase.length >= 3) {
                this._arrayTags = this._arrayFilteredStored;
                this._arrayFiltered = [];
                for (let recipe of this._arrayTags) {
                    if (recipe.name.toLowerCase().includes(searchStringLowerCase) ||
                        recipe.description.toLowerCase().includes(searchStringLowerCase) ||
                        recipe.ustensils.some((ust) => {
                            return ust.toLowerCase().includes(searchStringLowerCase);
                        }) ||
                        recipe.appliance.toLowerCase().includes(searchStringLowerCase) ||
                        recipe.ingredients.some((composant) => {
                        return composant.ingredient.toLowerCase().includes(searchStringLowerCase);
                        })) {
                        this._arrayFiltered.push(recipe);
                    }
                }

                const cleanGallery = document.querySelectorAll('.recipe-card');
                cleanGallery.forEach(card => card.remove());
            
                this._arrayFiltered
                .map(recipe => new RecipeCard(recipe))
                .map(recipe => recipe.createRecipeCard());
            
                console.log(this._arrayFiltered);

                // Setting the list of ingredients, appliances, and utensils. 
                this.setIngList();
                this.setAppList();
                this.setUstList();

                if (this.$recipeGallery.firstElementChild === null) {
                    this.$noMatchMsg.classList.remove('display-none');
                } else {
                    this.$noMatchMsg.classList.add('display-none');
                }
            
            } else {
                const cleanGallery = document.querySelectorAll('.recipe-card');
                cleanGallery.forEach(card => card.remove());

                const $allTags = document.querySelectorAll('.tag__txt');
                console.log($allTags);

                this._arrayFiltered = $allTags.length === 0 ? this._recipes : this._arrayTags;
                this._arrayFiltered
                .map(recipe => new RecipeCard(recipe))
                .map(recipe => recipe.createRecipeCard());
            
                // Setting the list of ingredients, appliances, and utensils. 
                this.setIngList();
                this.setAppList();
                this.setUstList();

                if (this.$noMatchMsg.classList !== 'no-match display-none') {
                    this.$noMatchMsg.classList.add('display-none');
                }
            }
        });
    }

    /**
     * It takes an array of objects, maps it to an array of strings, concatenates and sorts the array
     * of strings, maps it to an array of objects, and then maps it to an array of DOM elements.
     * In order to display the ingredients list, or the appliances list, or the ustensils list.
     */
    setIngList() {
        const allIngOptions = document.querySelectorAll('.opt__ingredient');
        allIngOptions.forEach(ing => ing.remove());

        const listIng = this._arrayFiltered
        .map(ing => new ComboBoxMain(ing))
        .map(ing => ing.getIngredientOnly());

        ManageArray.concatSortArray(listIng)
        .map(ing => new ComboBoxElt(ing))
        .map(ing => ing.addIngredientsList());

    }

    setAppList() {
        const allAppOptions = document.querySelectorAll('.opt__appliance');
        allAppOptions.forEach(app => app.remove());

        const listApp = this._arrayFiltered
        .map(app => new ComboBoxMain(app))
        .map(app => app.getApplianceOnly());

        ManageArray.concatSortArray(listApp)
        .map(app => new ComboBoxElt(app))
        .map(app => app.addAppliancesList());
    }

    setUstList() {
        const allUstOptions = document.querySelectorAll('.opt__ustensil');
        allUstOptions.forEach(ust => ust.remove());

        const listUst = this._arrayFiltered
        .map(ust => new ComboBoxMain(ust))
        .map(ust => ust.getUstensilOnly());

        ManageArray.concatSortArray(listUst)
        .map(ust => new ComboBoxElt(ust))
        .map(ust => ust.addUstensilsList());
    }

    /**
     * Filters an array of objects based on a search string, then displays
     * the filtered array in a dropdown list.
     * Displays ingredients list/appliances list/ustensils list based on search string.
     */
    researchIngredients() {
        const inputIngredient = document.getElementById('input__ingredient');

        inputIngredient.addEventListener('input', (eventInput) => {
            const searchString = eventInput.target.value;
            const searchStringLowerCase = searchString.toLowerCase();
            if (searchStringLowerCase.length >= 3) {
                this._arrayTags = [];
                for (let element of this._arrayFiltered) {
                    if (element.ingredients.some((composant) => {
                        return composant.ingredient.toLowerCase().includes(searchStringLowerCase);
                        })
                    ) {
                        this._arrayTags.push(element);
                    }
                }

                const allIngOptions = document.querySelectorAll('.opt__ingredient');
                allIngOptions.forEach(ing => ing.remove());

                console.log(this._arrayTags);

                const filteredIng = this._arrayTags
                .map(ing => new ComboBoxMain(ing))
                .map(ing => ing.getIngredientOnly());

                const sortedIng = ManageArray.concatSortArray(filteredIng)
                .filter(element => element.includes(searchStringLowerCase))
                .map(ing => new ComboBoxElt(ing))
                .map(ing => ing.addIngredientsList());
            
                console.log(sortedIng);
                

            } else {
                const allIngOptions = document.querySelectorAll('.opt__ingredient');
                allIngOptions.forEach(ing => ing.remove());

                const listIng = this._arrayFiltered
                .map(ing => new ComboBoxMain(ing))
                .map(ing => ing.getIngredientOnly());

                const sortedListIng = ManageArray.concatSortArray(listIng)
                .map(ing => new ComboBoxElt(ing))
                .map(ing => ing.addIngredientsList());

                console.log(sortedListIng);
            }
        });  
    }

    researchAppliances() {
        const inputAppliance = document.getElementById('input__appliance');

        inputAppliance.addEventListener('input', (eventInput) => {
            const searchString = eventInput.target.value;
            const searchStringLowerCase = searchString.toLowerCase();
            if (searchStringLowerCase.length >= 3) {
                this._arrayTags = [];
                for (let element of this._arrayFiltered) {
                    if (element.appliance.toLowerCase().includes(searchStringLowerCase)) {
                        this._arrayTags.push(element);
                    }
                }
               
                const allAppOptions = document.querySelectorAll('.opt__appliance');
                allAppOptions.forEach(app => app.remove());

                console.log(this._arrayTags);

                const filteredApp = this._arrayTags
                .map(app => new ComboBoxMain(app))
                .map(app => app.getApplianceOnly());

                const sortedApp = ManageArray.concatSortArray(filteredApp)
                .filter(element => element.includes(searchStringLowerCase))
                .map(app => new ComboBoxElt(app))
                .map(app => app.addAppliancesList());
            
                console.log(sortedApp);
                

            } else {
                const allAppOptions = document.querySelectorAll('.opt__appliance');
                allAppOptions.forEach(app => app.remove());

                const listApp = this._arrayFiltered
                .map(app => new ComboBoxMain(app))
                .map(app => app.getApplianceOnly());

                const sortedListApp = ManageArray.concatSortArray(listApp)
                .map(app => new ComboBoxElt(app))
                .map(app => app.addAppliancesList());

                console.log(sortedListApp);

            }
        });
    }

    researchUstensils() {
        const inputUstensil = document.getElementById('input__ustensil');

        inputUstensil.addEventListener('input', (eventInput) => {
            const searchString = eventInput.target.value;
            const searchStringLowerCase = searchString.toLowerCase();
            if (searchStringLowerCase.length >= 3) {
                this._arrayTags = [];
                for (let element of this._arrayFiltered) {
                    if (element.ustensils.some((ust) => {
                        return ust.toLowerCase().includes(searchStringLowerCase);
                     })) {
                        this._arrayTags.push(element);
                     }
                }
            
                const allUstOptions = document.querySelectorAll('.opt__ustensil');
                allUstOptions.forEach(ust => ust.remove());

                console.log(this._arrayTags);

                const filteredUst = this._arrayTags
                .map(ust => new ComboBoxMain(ust))
                .map(ust => ust.getUstensilOnly());

                ManageArray.concatSortArray(filteredUst)
                .filter(element => element.includes(searchStringLowerCase))
                .map(ust => new ComboBoxElt(ust))
                .map(ust => ust.addUstensilsList());

            } else {
                const allUstOptions = document.querySelectorAll('.opt__ustensil');
                allUstOptions.forEach(ust => ust.remove());

                const listUst = this._arrayFiltered
                .map(ust => new ComboBoxMain(ust))
                .map(ust => ust.getUstensilOnly());

                ManageArray.concatSortArray(listUst)
                .map(ust => new ComboBoxElt(ust))
                .map(ust => ust.addUstensilsList());
            }
        });
    }
 
}
