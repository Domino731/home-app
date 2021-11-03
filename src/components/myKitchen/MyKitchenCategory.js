import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { sortingByAlphabeticalProducts } from "../../functions/sorting";
import MyKitchenAddProductForm from "./MyKitchenAddProductForm";
import MyKitchenProduct from "./MyKitchenProduct";

/**
 * component which is displaying all user products of a particular type
 * @param {string} title - title for product category 
 * @param products - REDUX STATE - array with data about all products, based on this data all products will be rendering
 * @param productType - type of product, needed to filter redux's products state in order to pull out products of this type 
 */
const MyKitchenCategory = ({ title, products, productType }) => {

    // flags by which user can toggle between new product form and all products list
    const [showList, setShowList] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    // an array of products by which individual products are rendered
    const [productsArray, setProductsArray] = useState([]);

    // state with selected sorting
    const [sorting, setSorting] = useState("Alfabetycznie A - Z");

    // filter redux's products state and pull out products of particular type
    useEffect(() => {
        products && setProductsArray(products.filter(el => el.type === productType));
    }, [products]);

    // sort product by selected option - sorting state
    useEffect(() => {
        return sortingByAlphabeticalProducts(sorting, setProductsArray);
    }, [sorting]);

    /** change showList state - toogle content */
    const handleChangeShowList = () => {
        if (showList === true) {
            setShowList(false);
        } else {
            setShowList(true);
        }
        return setShowAddForm(false);
    }

    /** change showAddForm state - toogle content */
    const handleChangeShowAddForm = () => {
        if (showAddForm === true) {
            setShowAddForm(false);
        } else {
            setShowAddForm(true);
        }
        return setShowList(false);
    }

    /** change sorting state - useEffect will sort products by selected option */
    const handleChangeSorting = () => {
        if (sorting === "Alfabetycznie A - Z") {
            return setSorting("Alfabetycznie Z - A");
        } else {
            return setSorting("Alfabetycznie A - Z");
        }
    }


    return (
        <div className='kitchenCtg'>


            <div className="kitchenCtg__title">
                {/* icon by which use can display products list */}
                {showList ? <i className="fas fa-chevron-up" onClick={handleChangeShowList} title='Zwin listę z produktami' /> :
                    <i className="fas fa-chevron-down" onClick={handleChangeShowList} title='Pokaż listę z produktami' />}

                {/* name of product type */}
                <h2>{title}</h2>

                {/* icon by which use can display add new product form */}
                {showAddForm ? <i className="fas fa-times" onClick={handleChangeShowAddForm} title='Zamknij formularz' /> :
                    <i className="fas fa-plus" onClick={handleChangeShowAddForm} title='Dodaj nowy produkt' />}
            </div>

            {/*displaying new product form*/}
            {showAddForm && <MyKitchenAddProductForm productType={productType} />}

            {/*displaying products list*/}
            {showList && <section className="kitchenCtg__list">

                {/*if product array is empty, return notification, if not return individual products*/}
                {
                    productsArray.length !== 0 ?
                        <>
                            {/* button by which user can sort array with products */}
                            <div className="sort sort--blue" onClick={handleChangeSorting}>
                                <button>{sorting}</button>
                            </div>

                            {/* rendering products */}
                            {productsArray.map(el => <MyKitchenProduct key={el.id} prod={el} id={el.id} />)}</>
                        :
                        // notification
                        <div className="empty">
                            Brak zapisanych produktów, dodaj je naciskając w plusa po prawej stronie
                            <i className="fas fa-plus" />
                        </div>

                }
            </section>}
        </div>
    );
}

// REDUX
const mapStateToProps = state => ({
    // array with data about user's products
    products: state.products
})
export default connect(mapStateToProps)(MyKitchenCategory);