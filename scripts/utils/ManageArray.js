class ManageArray {
    static concatSortArray(array) {
        const concatObj = [...new Set([].concat(...array.map((element) => element)))]

        const concatArrays = [...new Set([].concat(...concatObj.map((element) => element)))]

        const arrayLowerCase = concatArrays.map(element => {
            return element.toLowerCase();
        })

        const uniqueElements = [...new Set(arrayLowerCase)]

        const sortedArray = Array.from(uniqueElements).sort((a,b) => a.localeCompare(b))

        return sortedArray

    }
}