// component that renders by individual product categories based
// on the category category database from firestore(collection productsRendering)

import { useEffect, useState } from "react";
import { db } from "../../fireBase/fireBase";
import MyKitchenBar from "./MyKitchenBar";
import MyKitchenCategory from "./MyKitchenCategory";
import { Loading } from "../loading/Loading";
import { connect } from "react-redux";
import { setProducts } from "../../redux/actions/firebaseData.actions";
import { getDataFromFirestore } from "../../fireBase/getDataFromFirestore";
import { auth } from "../../fireBase/fireBase";
import background from "../../images/background_products.jpg";

const MyKitchen = ({ setProducts }) => {

    //state with array from firestore,is used to rendering specific type for products
    const [renderingArray, setRenderingArray] = useState([])

    // fetch data about user's products
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                getDataFromFirestore('products', user.uid, setProducts)
            }
        });
    }, []);

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

    // blocking view while data fetching by getDataFromFirestore() function in useEffect() hook
    if (renderingArray.length === 0) {
        return <Loading />
    }

    return <section className="container kitchen">
        <style>{`body{ background-image: url(${background})}`}</style>

        {/* header */}
        <MyKitchenBar />

        {/* content */}
        <section>
            {
                renderingArray.map(el => <MyKitchenCategory title={el.title} productType={el.productType} key={el.id} />)
            }
        </section>

        {/* freepik background author */}
        <div className='freepik'>
            <a href='https://www.freepik.com/photos/food'>Food photo created by freepik - www.freepik.com</a>
        </div>

    </section>
}

const mapDispatchToProps = dispatch => ({
    setProducts: data => dispatch(setProducts(data)),
})
export default connect(null, mapDispatchToProps)(MyKitchen)


