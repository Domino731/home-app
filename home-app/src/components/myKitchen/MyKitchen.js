import MyKitchenBar from "./MyKitchenBar";
import {MyKitchenCategory} from "./MyKitchenCategory";
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
            <MyKitchenCategory category="Mięso" productType={"meat"}/>
        </section>
    )
}
const MyKitchen = () => <MyKitchenComponent db={db}/>

const mapStateToProps = state => ({
    currentUser: state.currentUser
})
export default connect(mapStateToProps)(MyKitchen)
