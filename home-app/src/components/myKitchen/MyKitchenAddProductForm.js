import {useEffect, useState} from "react";
import {addNewProduct} from "../../functions/addNewProduct";
import {connect} from "react-redux";
import {getFirestoreId} from "../../functions/getFirestoreId";

const MyKitchenAddProductForm = ({username}) => {
    const [unit, setUnit] = useState("Dag")
    const [product, setProduct] = useState({name: "", amount: ""})
    const [invalidFlag, setInvalidFlag] = useState(false)
    useEffect(()=>{
        getFirestoreId(username)
    },[])
    const handleChangeUnit = (e) => {
        setUnit(e.target.value)
    }
    const handleChangeProduct = (e) => {
        const {name, value} = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmitProduct = (e) => {
        e.preventDefault()
        if(product.name.length <= 2){
           setInvalidFlag(true)
        }
        else{
            addNewProduct()
        }
    }
    return (
        <section className="kitchenCtg__addProduct">
            <form className="addProduct__form">

                <input type="text" className="addProduct__formInput" placeholder="Nazwa produktu" name="name"
                       onChange={handleChangeProduct}/>
                <input type="number" className="addProduct__formInput" placeholder={`Ilość (${unit})`} name="amount"
                       onChange={handleChangeProduct}/>
                <fieldset>
                    <label> <input type="radio" name="weightUnit" value="Kg" onClick={handleChangeUnit}/> Kilogramy
                    </label>
                    <label> <input type="radio" name="weightUnit" value="Dag" onClick={handleChangeUnit}
                                   defaultChecked/> Dekagramy </label>
                    <label> <input type="radio" name="weightUnit" value="G" onClick={handleChangeUnit}/> Gramy </label>
                    <label> <input type="radio" name="weightUnit" value="Na sztuki" onClick={handleChangeUnit}/> Na
                        sztuki
                    </label>
                </fieldset>
                {invalidFlag && <strong className="addProduct__invalid">*Wprowadz poprawną nazwę produktu</strong>}
                <button className="addProduct__formButton" onClick={handleSubmitProduct}>Dodaj <span/></button>
            </form>
        </section>
    )
}
const mapStateToProps = state => ({
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyKitchenAddProductForm)