//component containing a single ingredient, it used in MyRecipeAddForm and MyRecipeEditForm components

// props //
// del --> function that deletes a recipe
// el --> specific  ingredient to delete
// ingredient --> single ingredient
export const MyRecipeAddFormIngredients = ({del, el, ingredient}) => {

    //function which deletes a specific ingredient form recipe
    const handleDelete = (e) => {
        e.preventDefault()
        if (typeof del === "function") {
            del(el)
        }
    }
    return (
        <li>
            <p className="list-p">
                <i className="fas fa-trash-alt"
                   onClick={handleDelete}/>
                <strong>{ingredient.amount} {ingredient.unit}</strong><i className="fas fa-long-arrow-alt-right"/>
                <strong>{ingredient.name}</strong>
            </p>
        </li>
    )
}