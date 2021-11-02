//component responsible for a single recipe
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {useHistory, Redirect} from "react-router-dom";
import {deleteDataFirestore} from "../../fireBase/deleteDataFirestore";
//components
import {Loading} from "../loading/Loading";
import { getRecipeData } from "../../fireBase/getRecipeData";
import { auth } from "../../fireBase/fireBase";

// props //
// AllRecipes --> all recipes from application store
// id --> to get a specific recipe, and delete him in deleteDataFirestore
// username --> to delete recipe in deleteDataFirestore
const MyRecipeSingleRecipe = (props) => {

    const [data, setData] = useState(null)
    useEffect(()=> {
        return auth().onAuthStateChanged(user => {
            if(user) {
               getRecipeData(user.uid, props.match.params.id, setData ) 
            }
        })
    },[])
    return <main className="container">

    </main>
}

//all the recipes that and then the one with a specific id is returned
// username so as to delete recipe in deleteDataFirestore

export default MyRecipeSingleRecipe
