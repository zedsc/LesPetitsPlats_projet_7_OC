class ResearchFilter {
    constructor(recipes) {
        this._recipes = recipes;
        this._arrayInputMain = recipes;
        this._arrayInputMainStored = recipes;
        this._arrayInputMainPrevious = recipes;
        this._arrayInputCombobox = recipes;
        this._arrayInputComboboxStored = recipes;
        this._arrayInputComboboxPrevious = recipes;
        this._arrayTagged = [];

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
                        that._arrayInputMainStored = that._arrayInputMain;
                        that._arrayFitleredPrevious = that._arrayInputMain;
                        that._arrayTagged = that._arrayInputMain.filter((recipe)=> {
                            return (
                                recipe.name.toLowerCase().includes(tagsValue) ||
                                recipe.description.toLowerCase().includes(tagsValue) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue);
                                 }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue) ||
                                recipe.ingredients.some((composant) => {
                                 return composant.ingredient.toLowerCase().includes(tagsValue);
                                })
                            );
                        });
                     
                        that._arrayInputMain = that._arrayTagged;
                        that._arrayInputCombobox = that._arrayTagged;
                    } else if (tagsValue.length >= 2) {
                        that._arrayInputComboboxStored = that._arrayInputCombobox;
                        that._arrayInputComboboxPrevious = that._arrayInputCombobox;
                        that._arrayInputCombobox = that._arrayTagged.filter((recipe)=> {
                            return (
                                recipe.name.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.description.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue.slice(-1));
                                 }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ingredients.some((composant) => {
                                 return composant.ingredient.toLowerCase().includes(tagsValue.slice(-1));
                                })
                            );
                        });
                        that._arrayTagged = that._arrayInputCombobox;
                        that._arrayInputMain = that._arrayInputCombobox;
                    }

                    console.log (that._arrayTagged);
                    console.log(that._arrayInputMain);

                    const cleanGallery = document.querySelectorAll('.recipe-card');
                    cleanGallery.forEach(card => card.remove());
                
                    that._arrayInputMain
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
                        that._arrayTagged = that._arrayInputMainStored.filter((recipe)=> {
                            return (
                                recipe.name.toLowerCase().includes(tagsValue) ||
                                recipe.description.toLowerCase().includes(tagsValue) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue);
                                 }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue) ||
                                recipe.ingredients.some((composant) => {
                                 return composant.ingredient.toLowerCase().includes(tagsValue);
                                })
                            );
                        });
                     
                        that._arrayInputMain = that._arrayTagged;
                        that._arrayInputCombobox = that._arrayTagged;
                    } else if (tagsValue.length >= 2) {

                        that._arrayInputCombobox = that._arrayInputComboboxPrevious.filter((recipe)=> {
                            return (
                                recipe.name.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.description.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ustensils.some((app) => {
                                    return app.toLowerCase().includes(tagsValue.slice(-1));
                                 }) ||
                                recipe.appliance.toLowerCase().includes(tagsValue.slice(-1)) ||
                                recipe.ingredients.some((composant) => {
                                 return composant.ingredient.toLowerCase().includes(tagsValue.slice(-1));
                                })
                            );
                        });
                        that._arrayTagged = that._arrayInputCombobox;
                        that._arrayInputMain = that._arrayInputCombobox;
                    } else {
                        that._arrayInputMain = that._arrayInputMainStored;
                        that._arrayInputCombobox = that._arrayInputComboboxStored;

                        if (that.$noMatchMsg.classList !== 'no-match display-none') {
                            that.$noMatchMsg.classList.add('display-none');
                        }
                    }

                   
                    console.log (that._arrayTagged);
                

                    console.log(that._arrayInputCombobox);
                    console.log(that._arrayInputMain);

                    const cleanGallery = document.querySelectorAll('.recipe-card');
                    cleanGallery.forEach(card => card.remove());
                
                    that._arrayInputMain
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
                const $allTags = document.querySelectorAll('.tag__txt');
                this._arrayInputCombobox = $allTags.length === 0 ? this._recipes : this._arrayTagged;
                this._arrayInputMain = this._arrayInputCombobox.filter((recipe) => {
                    return (
                        recipe.name.toLowerCase().includes(searchStringLowerCase) ||
                        recipe.description.toLowerCase().includes(searchStringLowerCase) ||
                        recipe.ustensils.some((ust) => {
                            return ust.toLowerCase().includes(searchStringLowerCase);
                         }) ||
                        recipe.appliance.toLowerCase().includes(searchStringLowerCase) ||
                        recipe.ingredients.some((composant) => {
                         return composant.ingredient.toLowerCase().includes(searchStringLowerCase);
                        })
                    );
                });

                const cleanGallery = document.querySelectorAll('.recipe-card');
                cleanGallery.forEach(card => card.remove());
            
        
                this._arrayInputMain
                .map(recipe => new RecipeCard(recipe))
                .map(recipe => recipe.createRecipeCard());
            
                console.log(this._arrayInputMain);

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

                this._arrayInputMain = $allTags.length === 0 ? this._recipes : this._arrayInputCombobox;
                const recipesCard = this._arrayInputMain
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

        const listIng = this._arrayInputMain
        .map(ing => new ComboBoxMain(ing))
        .map(ing => ing.getIngredientOnly());

        ManageArray.concatSortArray(listIng)
        .map(ing => new ComboBoxElt(ing))
        .map(ing => ing.addIngredientsList());

    }

    setAppList() {
        const allAppOptions = document.querySelectorAll('.opt__appliance');
        allAppOptions.forEach(app => app.remove());

        const listApp = this._arrayInputMain
        .map(app => new ComboBoxMain(app))
        .map(app => app.getApplianceOnly());

        ManageArray.concatSortArray(listApp)
        .map(app => new ComboBoxElt(app))
        .map(app => app.addAppliancesList());
    }

    setUstList() {
        const allUstOptions = document.querySelectorAll('.opt__ustensil');
        allUstOptions.forEach(ust => ust.remove());

        const listUst = this._arrayInputMain
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
                this._arrayInputCombobox = this._arrayInputMain.filter((element) => {
                    return (
                        element.ingredients.some((composant) => {
                        return composant.ingredient.toLowerCase().includes(searchStringLowerCase);
                        })
                    );
                });

                const allIngOptions = document.querySelectorAll('.opt__ingredient');
                allIngOptions.forEach(ing => ing.remove());

                console.log(this._arrayInputCombobox);

                const filteredIng = this._arrayInputCombobox
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

                const listIng = this._arrayInputMain
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
                this._arrayInputCombobox = this._arrayInputMain.filter((element) => {
                    return (
                        element.appliance.toLowerCase().includes(searchStringLowerCase)
                    );
                });

                const allAppOptions = document.querySelectorAll('.opt__appliance');
                allAppOptions.forEach(app => app.remove());

                console.log(this._arrayInputCombobox);

                const filteredApp = this._arrayInputCombobox
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

                const listApp = this._arrayInputMain
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
                this._arrayInputCombobox = this._arrayInputMain.filter((element) => {
                    return (
                        element.ustensils.some((ust) => {
                            return ust.toLowerCase().includes(searchStringLowerCase);
                         })
                    );
                });

                const allUstOptions = document.querySelectorAll('.opt__ustensil');
                allUstOptions.forEach(ust => ust.remove());

                console.log(this._arrayInputCombobox);

                const filteredUst = this._arrayInputCombobox
                .map(ust => new ComboBoxMain(ust))
                .map(ust => ust.getUstensilOnly());

                ManageArray.concatSortArray(filteredUst)
                .filter(element => element.includes(searchStringLowerCase))
                .map(ust => new ComboBoxElt(ust))
                .map(ust => ust.addUstensilsList());

            } else {
                const allUstOptions = document.querySelectorAll('.opt__ustensil');
                allUstOptions.forEach(ust => ust.remove());

                const listUst = this._arrayInputMain
                .map(ust => new ComboBoxMain(ust))
                .map(ust => ust.getUstensilOnly());

                ManageArray.concatSortArray(listUst)
                .map(ust => new ComboBoxElt(ust))
                .map(ust => ust.addUstensilsList());
            }
        });
    }
 
}
