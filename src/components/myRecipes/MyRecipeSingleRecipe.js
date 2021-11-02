//component responsible for a single recipe
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { deleteDataFirestore } from "../../fireBase/deleteDataFirestore";
//components
import { Loading } from "../loading/Loading";
import { getRecipeData } from "../../fireBase/getRecipeData";
import { auth } from "../../fireBase/fireBase";
import { changeRecipeDataRDX } from "../../redux/actions/recipeData.actions";
import { changeRecipeStylesRDX } from "../../redux/actions/recipeStyles.actions";
import { getRecipeStyles } from "../../fireBase/getRecipeStyles";
import SingleRecipeHeader from "./SingleRecipeHeader";
import { setToDos } from "../../redux/actions/firebaseData.actions";
import { getDataFromFirestore } from "../../fireBase/getDataFromFirestore";
// props //
// AllRecipes --> all recipes from application store
// id --> to get a specific recipe, and delete him in deleteDataFirestore
// username --> to delete recipe in deleteDataFirestore
const MyRecipeSingleRecipe = (props) => {

    // fetch data about specific recipe from firestore 
    useEffect(() => {
        return auth()
            .onAuthStateChanged(user => {
                if (user) {

                    return getRecipeData(user.uid, props.match.params.id, props.changeRecipeData)
                        .then(() => getDataFromFirestore('ToDo', user.uid, props.setToDos))
                }
            })
    }, [props.match.params.id]);

    // fetch data about styles of particular type of recipe (svg icon and color) 
    useEffect(() => {
        props.recipe && getRecipeStyles(props.recipe.type, props.changeRecipeStyles)
    }, [props.recipe]);

    if (props.recipe === null || props.recipeStyles === null || props.tasks === null) {
        return <Loading />
    }

    return <main className="container">
        <SingleRecipeHeader />
    </main>
}

//all the recipes that and then the one with a specific id is returned
// username so as to delete recipe in deleteDataFirestore
const mapDispatchToProps = dispatch => ({
    changeRecipeData: data => dispatch(changeRecipeDataRDX(data)),
    changeRecipeStyles: data => dispatch(changeRecipeStylesRDX(data)),
    setToDos: data => dispatch(setToDos(data))
})
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles,
    tasks: state.toDo
})
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipeSingleRecipe)
