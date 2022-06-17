const comboboxes = [
    {
        "combobox": document.querySelector('.combobox__ingredient'),
        "list": document.getElementById('ingredient-list'),
        "input": document.getElementById('input__ingredient'),
        "arrow": document.getElementById('arrow__ingredient'),
        "placeholder": "Rechercher un ingrédient",
        "category": "Ingrédients"
    },
    {
        "combobox": document.querySelector('.combobox__appliance'),
        "list": document.getElementById('appliance-list'),
        "input": document.getElementById('input__appliance'),
        "arrow": document.getElementById('arrow__appliance'),
        "placeholder": "Rechercher un appareil",
        "category": "Appareils"
    },
    {
        "combobox": document.querySelector('.combobox__ustensil'),
        "list": document.getElementById('ustensil-list'),
        "input": document.getElementById('input__ustensil'),
        "arrow": document.getElementById('arrow__ustensil'),
        "placeholder": "Rechercher un ustensile",
        "category": "Ustensiles"
    },
]

const comboboxIngredients = 
{
    "combobox": document.querySelector('.combobox__ingredient'),
    "list": document.getElementById('ingredient-list'),
    "input": document.getElementById('input__ingredient'),
    "arrow": document.getElementById('arrow__ingredient'),
    "placeholder": "Rechercher un ingrédient",
    "category": "Ingrédients"
};

const comboboxAppliances =
{
    "combobox": document.querySelector('.combobox__appliance'),
    "list": document.getElementById('appliance-list'),
    "input": document.getElementById('input__appliance'),
    "arrow": document.getElementById('arrow__appliance'),
    "placeholder": "Rechercher un appareil",
    "category": "Appareils"
};

const comboboxUstensils =
{
    "combobox": document.querySelector('.combobox__ustensil'),
    "list": document.getElementById('ustensil-list'),
    "input": document.getElementById('input__ustensil'),
    "arrow": document.getElementById('arrow__ustensil'),
    "placeholder": "Rechercher un ustensile",
    "category": "Ustensiles"
};


export {comboboxIngredients}
export {comboboxAppliances}
export {comboboxUstensils}
export {comboboxes}