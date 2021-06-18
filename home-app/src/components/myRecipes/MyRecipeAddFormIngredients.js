export const MyRecipeAddFormIngredients = ({del,el, ingredient}) => {
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