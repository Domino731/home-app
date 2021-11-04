import { Link } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Component which is redirecting user to list of specific recipes
 * @param {*} path - name of recipes type 
 * @returns 
 */
export const MyRecipeTypeRedirect = ({ recipeType, title }) => {
    return (
        <Link to={`/myRecipes/${recipeType}`} className='recipeRedirect' >
            <span />
            <div> {title} </div>
        </Link>
    );
}