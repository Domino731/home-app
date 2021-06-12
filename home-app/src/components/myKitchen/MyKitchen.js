import {MyKitchenBar} from "./MyKitchenBar";
import {MyKitchenCategory} from "./MyKitchenCategory";
import {db} from "../../fireBase/fireBase";
import {useEffect} from "react";
import {getProductsFromFirestore} from "../../functions/getDataFromFirestore";

export const MyKitchen = () => <MyKitchenComponent db={db}/>
const MyKitchenComponent = ({ db = null}) => {
    useEffect(() => {
        if (db) {
        getProductsFromFirestore()
        }
    }, [db])

    return (
        <section className="container">
            <MyKitchenBar/>
            <MyKitchenCategory category="Mięso"/>
        </section>
    )
}
