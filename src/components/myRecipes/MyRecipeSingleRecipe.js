//component responsible for a single recipe
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {useHistory, Redirect} from "react-router-dom";
import {deleteDataFirestore} from "../../fireBase/deleteDataFirestore";
//components
import {Loading} from "../loading/Loading";
import { getRecipeData } from "../../fireBase/getRecipeData";
import { auth } from "../../fireBase/fireBase";
import { changeRecipeDataRDX } from "../../redux/actions/recipeData.actions";
// props //
// AllRecipes --> all recipes from application store
// id --> to get a specific recipe, and delete him in deleteDataFirestore
// username --> to delete recipe in deleteDataFirestore
const MyRecipeSingleRecipe = (props) => {

    // fetch data about specific recipe from firestore 
    useEffect(()=> {
        return auth().onAuthStateChanged(user => user && getRecipeData(user.uid, props.match.params.id, props.changeRecipeData )) 

    },[]);
    if(props.recipe === null){
        return <Loading/>
    }

    return <main className="container">

    </main>
}

//all the recipes that and then the one with a specific id is returned
// username so as to delete recipe in deleteDataFirestore
const mapDispatchToProps = dispatch => ({
    changeRecipeData: data => dispatch(changeRecipeDataRDX(data))
})
const mapStateToProps = state => ({
    recipe: state.recipeData
})
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipeSingleRecipe)
