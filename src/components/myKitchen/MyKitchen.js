import { useEffect, useState } from "react";
import { db } from "../../fireBase/fireBase";
import MyKitchenBar from "./MyKitchenBar";
import MyKitchenCategory from "./MyKitchenCategory";
import { Loading } from "../loading/Loading";
import { connect } from "react-redux";
import { setProducts } from "../../redux/actions/firebaseData.actions";
import { getDataFromFirestore } from "../../fireBase/getDataFromFirestore";
import { auth } from "../../fireBase/fireBase";

/**
 * Component with whole content for kitchen products
 * @param setProducts - REDUX ACTION - function that changes redux's products state, based on this state list with products will be rendered 
 */
const MyKitchen = ({ setProducts }) => {

    // state with data about available types of products, based on this data all list with products will be rendering.
    // if you want to add new type of product, look at docs.
    const [renderingArray, setRenderingArray] = useState(null);

    // fetch data about user's products
    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            user && getDataFromFirestore('products', user.uid, setProducts);
        });
    }, []);

    // fetch data about available types of kitchen products
    useEffect(() => {
        return db.collection("productsRendering")
            .get()
            .then((querySnapshot) => {
                // save incomming data
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                return setRenderingArray(data.sort((a, b) => a.number - b.number));
            });
    }, []);

    // wait for data
    if (!renderingArray) {
        return <Loading />
    }

    return <section className="container kitchen">
        {/* header */}
        <MyKitchenBar />

        {/* content -> all list with products */}
        <section>
            {renderingArray.map(el => <MyKitchenCategory title={el.title} productType={el.productType} key={el.id} />)}
        </section>

    </section>
}

// REDUX
const mapDispatchToProps = dispatch => ({
    setProducts: data => dispatch(setProducts(data)),
});
export default connect(null, mapDispatchToProps)(MyKitchen);


