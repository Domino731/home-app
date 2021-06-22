import MyKitchenBar from "./MyKitchenBar";
import MyKitchenCategory from "./MyKitchenCategory";

import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
import {Loading} from "../loading/Loading";

export const MyKitchen = () => {
    const [renderingArray, setRenderingArray] = useState([])
    useEffect(() => {
        db.collection("productsRendering").get().then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setRenderingArray(data.sort((a,b) => a.number - b.number ))
        });
    }, [])





    if(renderingArray.length === undefined){
        return null
    }
    if(renderingArray.length === 0){
        return <Loading/>
    }
    return (
        <section className="container">
            <MyKitchenBar/>
            {
                renderingArray.map(el => <MyKitchenCategory title={el.title} productType={el.productType} key={el.id}/>)
            }

        </section>
    )
}


