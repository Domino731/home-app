//component which is used to add products to a specific product category by addNewElement function
//it used in MyKitchenCategory component
import {useState} from "react";
import {addNewElement} from "../../functions/addNewElementToFirebase";
import {connect} from "react-redux";

// props //
// username --> the name of the currently logged in user, is used in the addNewElement function
// productType --> name of productType, passed to product state, is to add a product to a specific category
const MyKitchenAddProductForm = ({username, productType}) => {

    //status containing all product information, is passed to the addNewElement function
    const [product, setProduct] = useState({name: "", amount: 0, unit: "Dag", type: productType})

    //flag by which an error is displayed, it changed when the product name is shorter than 2
    const [invalidFlag, setInvalidFlag] = useState(false)

    //flag by which a notification is displayed that a product has been added, when it false displayed form,
    //change in handleSubmitProduct function
    const [successful, setSuccessful] = useState(false)


    //changing the product unit
    const handleChangeUnit = (e) => {
        setProduct(prev => ({
            ...prev,
            unit: e.target.value
        }))
    }

    //changing the product
    const handleChangeProduct = (e) => {
        const {name, value} = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
        setInvalidFlag(false)
    };

    //sending new product
    //product name must be longer than 2
    const handleSubmitProduct = (e) => {
        e.preventDefault()
        if (product.name.length <= 2) {
            setInvalidFlag(true)
        } else {
            addNewElement(username, "products", product)
            setSuccessful(true)
        }
    }


    return (
        <section className="kitchenCtg__addProduct">


            {successful === false && <form className="addProduct__form">
                <input type="text" className="addProduct__formInput" placeholder="Nazwa produktu" name="name"
                       onChange={handleChangeProduct} maxLength="20"/>
                <input type="number" className="addProduct__formInput" placeholder={`Ilość (${product.unit})`}
                       name="amount"
                       onChange={handleChangeProduct}/>
                <fieldset>
                    <label> <input type="radio" name="weightUnit" value="Kg" onClick={handleChangeUnit}/> Kilogramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Dag" onClick={handleChangeUnit}
                                   defaultChecked/> Dekagramy </label>
                    <label> <input type="radio" name="weightUnit" value="G" onClick={handleChangeUnit} id="1t"/> Gramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Mg" onClick={handleChangeUnit}/> Miligramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Ml" onClick={handleChangeUnit}/> Mililitry
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Na sztuki" onClick={handleChangeUnit}/> Na
                        sztuki
                    </label>
                </fieldset>

                {/*show error when product name in shorter than 2*/}
                {invalidFlag && <strong className="addProduct__invalid">*Wprowadz poprawną nazwę produktu</strong>}

                {/*if adding a product was successful, display a notification and information if you want to add another*/}
                <button className="addProduct__formButton" onClick={handleSubmitProduct}>Dodaj <span/></button>
            </form>}


            {successful && <div className="addProduct__form">
                <div className="successful">
                    <h3>Dodano produkt</h3>
                    <i className="far fa-smile"/>
                    {/*when you click on this successful state change to false and form will be displayed*/}
                    <button onClick={() => setSuccessful(false)}>Dodaj Kolejny</button>
                </div>
            </div>}
        </section>
    )
}

//the username so that the function knows for which user to send the new product
const mapStateToProps = state => ({
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyKitchenAddProductForm)