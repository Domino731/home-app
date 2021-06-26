// functions that sort recipes, products alphabetically
// params //
// el --> the array you want to sort
// set --> sets the state with sorted array
export const sortingByAlphabeticalProducts  = (el, set) => {
    if (el === "Alfabetycznie Z - A") {
        set(prev => prev.sort((a, b) => {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
        }))
    } else {
        set(prev => prev.sort((a, b) => {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }))
    }
}
export const sortingByAlphabeticalRecipes  = (el, set) => {
    if (el === "Alfabetycznie Z - A") {
        set(prev => prev.sort((a, b) => {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
        }))
    } else {
        set(prev => prev.sort((a, b) => {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }))
    }
}