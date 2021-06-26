// component that renders by individual product categories based
// on the category category database from firestore(collection productsRendering)

//if you want to add new category add document to collection
//"productRendering", add a name, type, class for the icon, and a number -
//according to which the categories are sorted, if you want the newly added category
// to be at the end add the last biggest number, if you want to swap the order then
// swap the numbers of specific product types)

import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
//components
import MyKitchenBar from "./MyKitchenBar";
import MyKitchenCategory from "./MyKitchenCategory";
import {Loading} from "../loading/Loading";


export const MyKitchen = () => {

    //state with array from firestore,is used to rendering specific type for products
    const [renderingArray, setRenderingArray] = useState([])

    //when component mount get products form firestore and push them into renderingArray state
    useEffect(() => {
        db.collection("productsRendering").get().then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setRenderingArray(data.sort((a, b) => a.number - b.number))
        });
    }, [])


    if (renderingArray.length === undefined) {
        return null
    }
    if (renderingArray.length === 0) {
        return <Loading/>
    }
    return (
        <section className="container kitchen">
            <MyKitchenBar/>
            {
                renderingArray.map(el => <MyKitchenCategory title={el.title} productType={el.productType} key={el.id}/>)
            }

        </section>
    )
}


