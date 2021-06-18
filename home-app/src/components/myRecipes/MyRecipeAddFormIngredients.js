export const MyRecipeAddFormIngredients = ({del,el}) => {
        const handleDelete = (e) => {
            e.preventDefault()
            if (typeof del === "function") {
                del(el)
            }
        }
    return (
        <li>
            <i className="fas fa-trash-alt"
               onClick={handleDelete}/><span>asd</span>
        </li>
    )
}