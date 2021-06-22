export const sortingByAlphabeticalProducts  = (el, set) => {
    if (el === "Alfabetycznie Z - A") {
        set(prev => prev.sort((a, b) => {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
        }))
    } else {
        set(prev => prev.sort((a, b) => {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }))
    }
}
export const sortingByAlphabeticalRecipes  = (el, set) => {
    if (el === "Alfabetycznie Z - A") {
        set(prev => prev.sort((a, b) => {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
        }))
    } else {
        set(prev => prev.sort((a, b) => {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }))
    }
}