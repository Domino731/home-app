import {useEffect, useState} from "react";
import MyKitchenAddProductForm from "./MyKitchenAddProductForm";
import MyKitchenProduct from "./MyKitchenProduct";
import {connect} from "react-redux";
import {sortingByAlphabeticalProducts} from "../../functions/sorting";

const MyKitchenCategory = ({title, productType, products,}) => {
    const [showList, setShowList] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [productsArray, setProductsArray] = useState([])
    const [sorting, setSorting] = useState("Alfabetycznie A - Z")
    useEffect(() => {
        if (products !== null) {
            setProductsArray(products.filter(el => el.type === productType))
            sortingByAlphabeticalProducts(sorting, setProductsArray)
        }
    }, [products, productType, sorting])
    const handleChangeShowList = () => {
        if (showList === true) {
            setShowList(false)
        } else {
            setShowList(true)
        }
        setShowAddForm(false)
    }
    const handleChangeShowAddForm = () => {
        if (showAddForm === true) {
            setShowAddForm(false)
        } else {
            setShowAddForm(true)
        }
        setShowList(false)
    }
    const handleChangeSorting = () => {
        if (sorting === "Alfabetycznie A - Z") {
            setSorting("Alfabetycznie Z - A")
        } else {
            console.log(true)
            setSorting("Alfabetycznie A - Z")
        }
    }
    const fixClass = () => {
        if (showList) {
            return "kitchenCtg2"
        } else if (showAddForm) {
            return "kitchenCtg2"
        }
    }

    return (
            <section className={`kitchenCtg ${fixClass()}`}>
                <div className="kitchenCtg__title">
                    {showList ? <i className="fas fa-chevron-up" onClick={handleChangeShowList}/> :
                        <i className="fas fa-chevron-down" onClick={handleChangeShowList}/>}
                    <h2>{title}</h2>
                    {showAddForm ? <i className="fas fa-times" onClick={handleChangeShowAddForm}/> :
                        <i className="fas fa-plus" onClick={handleChangeShowAddForm}/>}
                </div>
                {showAddForm && <MyKitchenAddProductForm productType={productType}/>}
                {showList && <section className="kitchenCtg__list">
                    {
                        productsArray.length !== 0 ?
                            <>
                                <div className="sort sort--blue" onClick={handleChangeSorting}>
                                    <button>{sorting}</button>
                                </div>
                                {productsArray.map(el => <MyKitchenProduct key={el.id} prod={el} id={el.id}/>)}</>
                            :
                            <strong className="empty">Brak zapisanych produktów, dodaj je naciskająć w plusa po prawej
                                stronie<i
                                    className="fas fa-plus"/></strong>
                    }
                </section>}
            </section>
    )
}

const mapStateToProps = state => ({
    products: state.products
})
export default connect(mapStateToProps)(MyKitchenCategory)