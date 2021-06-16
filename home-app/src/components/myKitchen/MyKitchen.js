import MyKitchenBar from "./MyKitchenBar";
import MyKitchenCategory from "./MyKitchenCategory";
import {db} from "../../fireBase/fireBase";
import {useEffect} from "react";
import {getProductsFromFirestore} from "../../functions/getDataFromFirestore";
import {connect} from "react-redux";

const MyKitchenComponent = ({ db = null, currentUser }) => {
    useEffect(() => {
        if (db) {
            console.log(currentUser)
       // getProductsFromFirestore(username)
        }
    }, [db, currentUser])

    return (
        <section className="container">
            <MyKitchenBar/>
            <MyKitchenCategory title="Warzywa" productType={"vegetables"}/>
            <MyKitchenCategory title="Mięso" productType={"meat"}/>
            <MyKitchenCategory title="Nabiał" productType={"dairy"}/>
            <MyKitchenCategory title="Cukry" productType={"sugar"}/>
            <MyKitchenCategory title="Owoce" productType={"fruit"}/>
            <MyKitchenCategory title="Mrożonki" productType={"frozenFood"}/>
            <MyKitchenCategory title="Napoje" productType={"drinks"}/>
            <MyKitchenCategory title="Inne" productType={"others"}/>
        </section>
    )
}
const MyKitchen = () => <MyKitchenComponent db={db}/>

const mapStateToProps = state => ({
    currentUser: state.currentUser
})
export default connect(mapStateToProps)(MyKitchen)
