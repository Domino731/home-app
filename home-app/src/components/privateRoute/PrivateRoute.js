import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import UserForm from "../userForm/UserForm";
import {getProductsFromFirestore} from "../../functions/getDataFromFirestore";
import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
const PrivateRoute = ({currentUser, component: Component, ...rest}) => {
   const [s] = useState(db.collection("users"))
   useEffect(()=> {
       getProductsFromFirestore(currentUser.displayName)
   },[s,currentUser])
    return(
        <Route
            {...rest}
            render={props => {
               // if(currentUser.currentUser === null){
               //    return  <Redirect to="/login"/>
               // }
                if(currentUser === null){
                   return <UserForm/>
                }
               else if(currentUser === undefined){
                   return "ładuję ..."
               }
               else{
                  return <Component {...props}/>
               }
            }}
        >

        </Route>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
})
export default connect(mapStateToProps)(PrivateRoute)
