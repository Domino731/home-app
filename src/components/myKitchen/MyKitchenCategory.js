//component displaying all user products of a particular type

import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {sortingByAlphabeticalProducts} from "../../functions/sorting";
//components
import MyKitchenAddProductForm from "./MyKitchenAddProductForm";
import MyKitchenProduct from "./MyKitchenProduct";

// props //
// title --> title for category
// products --> products from application state
// productType --> used to retrieve products of a specific type from the application state
// component displaying all user products of a particular type

const MyKitchenCategory = ({title, products, productType}) => {

    //flag that displays products and icon change
    const [showList, setShowList] = useState(false)

    //flag that displays new product form and icon change
    const [showAddForm, setShowAddForm] = useState(false)

    //an array of products through which individual products are rendered
    const [productsArray, setProductsArray] = useState([])

    //sorting products alphabetically
    const [sorting, setSorting] = useState("Alfabetycznie A - Z")

    //downloading products of a specific type, and sorting productArray state
    useEffect(() => {
        if (products !== null) {
            setProductsArray(products.filter(el => el.type === productType))
            //sorting
            sortingByAlphabeticalProducts(sorting, setProductsArray)
        }
    }, [products, productType, sorting])

    // function to show or close the product list
    const handleChangeShowList = () => {
        if (showList === true) {
            setShowList(false)
        } else {
            setShowList(true)
        }
        setShowAddForm(false)
    }

    // function to show or close the new product form
    const handleChangeShowAddForm = () => {
        if (showAddForm === true) {
            setShowAddForm(false)
        } else {
            setShowAddForm(true)
        }
        setShowList(false)
    }

    //function that changes the state through which the sorting is done
    const handleChangeSorting = () => {
        if (sorting === "Alfabetycznie A - Z") {
            setSorting("Alfabetycznie Z - A")
        } else {
            setSorting("Alfabetycznie A - Z")
        }
    }


    return (
        <div className={`kitchenCtg`}>

            <div className="kitchenCtg__title">
                {/*changing icons when what is displayed*/}
                {showList ? <i className="fas fa-chevron-up" onClick={handleChangeShowList} title='Zwin listę z produktami'/> :
                    <i className="fas fa-chevron-down" onClick={handleChangeShowList} title='Pokaż listę z produktami'/>}
                <h2>{title}</h2>

                {/*changing icons when what is displayed*/}
                {showAddForm ? <i className="fas fa-times" onClick={handleChangeShowAddForm} title='Zamknij formularz'/> :
                    <i className="fas fa-plus" onClick={handleChangeShowAddForm} title='Dodaj nowy produkt'/>}
            </div>

            {/*displaying new product form*/}
            {showAddForm && <MyKitchenAddProductForm productType={productType}/>}

            {/*displaying products list*/}
            {showList && <section className="kitchenCtg__list">

                {/*if product array is empty, return notification, if not return individual products*/}
                {
                    productsArray.length !== 0 ?
                        <>
                            <div className="sort sort--blue" onClick={handleChangeSorting}>
                                <button>{sorting}</button>
                            </div>

                            {productsArray.map(el => <MyKitchenProduct key={el.id} prod={el} id={el.id}/>)}</>
                        :
                        <strong className="empty">Brak zapisanych produktów, dodaj je naciskając w plusa po prawej
                            stronie<i
                                className="fas fa-plus"/></strong>

                }
            </section>}



        </div>
    )
}

//getting all products form application state
const mapStateToProps = state => ({
    products: state.products
})
export default connect(mapStateToProps)(MyKitchenCategory)