import {useEffect, useState} from "react";
import {addNewElement} from "../../functions/addNewElementToFirebase";
import {connect} from "react-redux";


const MyKitchenAddProductForm = ({username, productType}) => {
    const [product, setProduct] = useState({name: "", amount: 0, unit: "Dag", type: productType})
    const [invalidFlag, setInvalidFlag] = useState(false)
    const [successful, setSuccessful] = useState(false)
    useEffect(() => {

    }, [product])

    const handleChangeUnit = (e) => {
        setProduct(prev => ({
            ...prev,
            unit: e.target.value
        }))
    }
    const handleChangeProduct = (e) => {
        const {name, value} = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
        setInvalidFlag(false)
    };
    const handleSubmitProduct = (e) => {
        e.preventDefault()
        if (product.name.length <= 2) {
            setInvalidFlag(true)
        }
        else {
            addNewElement(username, "products", product)
            setSuccessful(true)
        }
    }
    return (
        <section className="kitchenCtg__addProduct">
            {successful === false && <form className="addProduct__form">
                <input type="text" className="addProduct__formInput" placeholder="Nazwa produktu" name="name"
                       onChange={handleChangeProduct}/>
                <input type="number" className="addProduct__formInput" placeholder={`Ilość (${product.unit})`}
                       name="amount"
                       onChange={handleChangeProduct}/>
                <fieldset>
                    <label> <input type="radio" name="weightUnit" value="Kg" onClick={handleChangeUnit}/> Kilogramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Dag" onClick={handleChangeUnit}
                                   defaultChecked/> Dekagramy </label>
                    <label> <input type="radio" name="weightUnit" value="G" onClick={handleChangeUnit} id="1t"/> Gramy </label>
                    <label> <input type="radio" name="weightUnit" value="Mg" onClick={handleChangeUnit}/> Miligramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Na sztuki" onClick={handleChangeUnit}/> Na
                        sztuki
                    </label>
                </fieldset>
                {invalidFlag && <strong className="addProduct__invalid">*Wprowadz poprawną nazwę produktu</strong>}
                <button className="addProduct__formButton" onClick={handleSubmitProduct}>Dodaj <span/></button>
            </form>}
            {successful && <div className="addProduct__form">
                <div className="successful">
                    <h3>Dodano produkt</h3>
                    <i className="far fa-smile"/>
                    <button onClick={() => setSuccessful(false)}>Dodaj Kolejny</button>
                </div>
            </div>}
        </section>
    )
}
const mapStateToProps = state => ({
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyKitchenAddProductForm)