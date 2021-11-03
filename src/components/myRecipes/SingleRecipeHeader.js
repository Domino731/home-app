import { connect } from "react-redux"
import { useState, useEffect } from "react"
import { addNewElement } from "../../fireBase/addNewElementToFirebase";
import { auth } from "../../fireBase/fireBase";
const SingleRecipeHeader = ({ recipe, recipeStyles, tasks }) => {

    const [onTasksList, setOnTasksList] = useState(false);

    //state with new task
    const task = { title: recipe.title, description: "", operations: [], archive: false }

    // check if user has added this dish to his tasks list ('toDo' subcollection), if he is then change text in button to user know about it
    useEffect(() => {
        const index = tasks.findIndex(el => el.title === recipe.title);
        index !== -1 && setOnTasksList(true);
    }, [tasks]);

    const handleAddNewTask = () => {
        return addNewElement(auth().currentUser.uid, "ToDo", task)
    }
    const bgColorPrimary = {
        backgroundColor: recipeStyles.colorPrimary
    }
    const bgColorSecondary = {
        backgroundColor: recipeStyles.colorSecondary
    }
    return <header className="recipeHeader">

        <div style={bgColorPrimary} className="recipeHeader__item">
            <span className="recipeHeader__border" style={bgColorPrimary} />
            <div className="recipeHeader__icon" dangerouslySetInnerHTML={{ __html: recipeStyles.icon }}></div>
        </div>

        <button className="recipeHeader__btn" style={bgColorSecondary} onClick={handleAddNewTask}>
            {onTasksList ? `Usuń z listy zadań` : `Dodaj do listy zadań`}
        </button>
    </header>
}
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles,
    tasks: state.toDo
})
export default connect(mapStateToProps)(SingleRecipeHeader)