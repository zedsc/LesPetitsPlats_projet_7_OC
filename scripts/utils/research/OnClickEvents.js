
class OnClickEvents {
    /**
     * @param {object} data
     */
    constructor(data) {
        this._combobox = data.combobox
        this._list = data.list
        this._input = data.input
        this._arrowBtn = data.arrow
        this._placeholder = data.placeholder
        this._category = data.category
    }

    /**
     * If the combobox is clicked, close all other comboboxes, toggle the display of the list, toggle
     * the size of the combobox, toggle the opacity of the placeholder, toggle the rotation of the
     * arrow button, and if the combobox is open, set the placeholder to the placeholder's value, otherwise set
     * the placeholder to the category's value.
     */
    openCombobox() {
        const that = this
        this._combobox.addEventListener('click', () => {
            const comboboxIng = new OnClickEvents(comboboxIngredients)
            const comboboxApp = new OnClickEvents(comboboxAppliances)
            const comboboxUst = new OnClickEvents(comboboxUstensils)
            
            if (this._combobox.classList.contains('combobox__ingredient')) {
                comboboxUst.closeCombobox()
                comboboxApp.closeCombobox()
            } else if (this._combobox.classList.contains('combobox__appliance')) {
                comboboxUst.closeCombobox()
                comboboxIng.closeCombobox()
            } else {
                comboboxApp.closeCombobox()
                comboboxIng.closeCombobox()
            }

            this._list.classList.toggle('display-grid')
            this._combobox.classList.toggle('size-open')
            this._input.classList.toggle('placeholder-opacity')
            this._arrowBtn.classList.toggle('rotate')

            if (this._combobox.classList.contains('size-open')) {
                this._input.setAttribute('placeholder', this._placeholder)
                
            } else {
                this._input.setAttribute('placeholder', this._category)
            }
        })
    }

    /**
     * It removes the class 'size-open' from the combobox, removes the class 'display-grid' from the
     * list, removes the class 'placeholder-opacity' from the input, sets the placeholder attribute to
     * the category's value, and removes the class 'rotate' from the arrow button.
     */
    closeCombobox() {
        if (this._combobox.classList.contains('size-open')) {
            this._combobox.classList.remove('size-open')
            this._list.classList.remove('display-grid')
            this._input.classList.remove('placeholder-opacity')
            this._input.setAttribute('placeholder', this._category)
            this._arrowBtn.classList.remove('rotate')
        }
    }
}

import {comboboxes} from '/data/comboboxes.js'
import {comboboxIngredients} from '/data/comboboxes.js'
import {comboboxAppliances} from '/data/comboboxes.js'
import {comboboxUstensils} from '/data/comboboxes.js'


comboboxes.map(combobox => new OnClickEvents(combobox))
.forEach(combobox => combobox.openCombobox())
