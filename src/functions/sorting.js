/**
 * That function is sorting array with products alphabetically
 * @param {"Alfabetycznie Z - A" | "Alfabetycznie Z - A"} option - sorting option ->  A - Z or Z - A
 * @param {*} set - function with component state
 */
export const sortingByAlphabeticalProducts  = (option, set) => {
    if (option === "Alfabetycznie Z - A") {
        set(prev => prev.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
        }));
    } else {
        set(prev => prev.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }));
    }
}

