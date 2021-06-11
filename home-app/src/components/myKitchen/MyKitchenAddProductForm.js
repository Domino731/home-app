import {useState} from "react";

export const MyKitchenAddProductForm = () => {
    const [unit, setUnit] = useState("Dag")
    const [product, setProduct] = useState({name: "", amount: ""})
    const [invalidFlag, setInvalidFlag] = useState(false)
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
    }
    return (
        <section className="kitchenCtg__addProduct">
            <form className="addProduct__form">
                {/*<div className="addProduct__formIcon">*/}

                {/*</div>*/}

                <input type="text" className="addProduct__formInput" placeholder="Nazwa produktu" name="name"
                       onChange={handleChangeProduct}/>
                <input type="number" className="addProduct__formInput" placeholder={`Ilość (${unit})`} name="amount"
                       onChange={handleChangeProduct}/>
                <fieldset>
                    {/*<legend className="addProduct__formChose">Wybierz jednostkę masy</legend>*/}
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