import { connect } from "react-redux"
import { useState, useEffect } from "react"
import { addNewElement } from "../../fireBase/addNewElementToFirebase";
import { auth } from "../../fireBase/fireBase";
import { deleteDataFirestore } from "../../fireBase/deleteDataFirestore";
/**
 * Header for single recipe component
 * @param recipe - REDUX STATE - data about recipe
 * @param recipeStyles - REDUX STATE - data about recipe styles - colors and icon (<svg> tag)
 * @param tasks - REDUX STATE - data about user's tasks ('ToDo' subcollection in firestore)
 */
const SingleRecipeHeader = ({ recipe, recipeStyles, tasks }) => {

    // flag state, checks if the recipe is on user's tasks list
    const [onTasksList, setOnTasksList] = useState(false);

    // state with new task data
    const task = { title: recipe.title, description: "", operations: [], archive: false }

    // check if user has added this dish to his tasks list ('toDo' subcollection), if he is then change text in button to user know about it
    useEffect(() => {
        const index = tasks.findIndex(el => el.title === recipe.title);
        index !== -1 ? setOnTasksList(true) : setOnTasksList(false);
    }, [tasks]);

    /** add new task to user's account in firestore ('ToDo' subcollection), or remove this tasks if he has already add */
    const handleAddNewTask = () => {
        // create data about new task
        const data = task;
        data.added = new Date();

        // check if user has already add this task
        const index = tasks.findIndex(el => el.title === recipe.title);
        if (index < 0) {
            return addNewElement(auth().currentUser.uid, "ToDo", data);
        }
        else {
            return deleteDataFirestore(tasks[index].id, auth().currentUser.uid, "ToDo");
        }

    }

    /** styles - background color with recipe primary color */
    const bgColorPrimary = {
        backgroundColor: recipeStyles.colorPrimary
    }

    /** styles - background color with recipe secondary color */
    const bgColorSecondary = {
        backgroundColor: recipeStyles.colorSecondary
    }

    return <header className="recipeHeader">
        {/* icon (<svg> tag) */}
        <div style={bgColorPrimary} className="recipeHeader__item">
            <span className="recipeHeader__border" style={bgColorPrimary} />
            <div className="recipeHeader__icon" dangerouslySetInnerHTML={{ __html: recipeStyles.icon }}></div>
        </div>

        {/* button by which user can add this recipe to his tasks */}
        <button className="recipeHeader__btn" style={bgColorSecondary} onClick={handleAddNewTask}>
            {onTasksList ? `Usuń z listy zadań` : `Dodaj do listy zadań`}
        </button>
    </header>
}

// REDUX
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles,
    tasks: state.toDo
})
export default connect(mapStateToProps)(SingleRecipeHeader)