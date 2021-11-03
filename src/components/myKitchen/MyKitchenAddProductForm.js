import { useState } from "react";
import { addNewElement } from "../../fireBase/addNewElementToFirebase";
import { auth } from "../../fireBase/fireBase";

/**
 * Component by which user can add new product 
 * @param {string} productType - type of product, needed to set type of new product
 */
const MyKitchenAddProductForm = ({ productType }) => {

    // state containing all product information
    const [product, setProduct] = useState({ name: "", amount: 0, unit: "Dag", type: productType });

    // flag by which an error is displayed, it changed when the product name is shorter than 2
    const [invalidFlag, setInvalidFlag] = useState(false);

    // flag by which a notification is displayed that a product has been added, when it false display form,
    // change in handleSubmitProduct function
    const [successful, setSuccessful] = useState(false);

    /** Change new product weight unit */
    const handleChangeUnit = (e) => {
        return setProduct(prev => ({
            ...prev,
            unit: e.target.value
        }));
    }

    /** Change product data */
    const handleChangeProduct = (e) => {
        // set new data
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));

        // remove error
        setInvalidFlag(false)
    };

    /** add new product to user's account in firestore ('products' subcollection) */
    const handleSubmitProduct = (e) => {
        e.preventDefault()

        // check if product name has 2 characters at least
        if (product.name.length <= 2) {
            return setInvalidFlag(true);
        } else {
            return addNewElement(auth().currentUser.uid, "products", product)
                .then(() => setSuccessful(true))
        }
    }


    return (
        <section className="kitchenCtg__addProduct">

            {/* form  */}
            {successful === false && <form className="addProduct__form">

                {/* product name */}
                <input type="text" className="addProduct__formInput" placeholder="Nazwa produktu" name="name"
                    onChange={handleChangeProduct} maxLength="20" />

                {/* amount */}
                <input type="number" className="addProduct__formInput" placeholder={`Ilość (${product.unit})`}
                    name="amount"
                    onChange={handleChangeProduct} />

                {/* product weight unit */}
                <fieldset>
                    <label> <input type="radio" name="weightUnit" value="Kg" onClick={handleChangeUnit} /> Kilogramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Dag" onClick={handleChangeUnit}
                        defaultChecked /> Dekagramy </label>
                    <label> <input type="radio" name="weightUnit" value="G" onClick={handleChangeUnit} id="1t" /> Gramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Mg" onClick={handleChangeUnit} /> Miligramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Ml" onClick={handleChangeUnit} /> Mililitry
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Na sztuki" onClick={handleChangeUnit} /> Na
                        sztuki
                    </label>
                </fieldset>

                {/*show error when product name in shorter than 2*/}
                {invalidFlag && <strong className="addProduct__invalid">*Wprowadz poprawną nazwę produktu</strong>}

                {/* button by which user can add new product */}
                <button className="addProduct__formButton" onClick={handleSubmitProduct}>Dodaj <span /></button>

            </form>}

            {/*if adding a product was successful, display a notification and information if you want to add another*/}
            {successful && <div className="addProduct__form">
                <div className="successful">
                    <h3>Dodano produkt</h3>
                    <i className="far fa-smile" />

                    {/*when you click on this successful state change to false and form will be displayed again*/}
                    <button onClick={() => setSuccessful(false)}>Dodaj Kolejny</button>
                </div>
            </div>}
        </section>
    );
}


export default (MyKitchenAddProductForm);