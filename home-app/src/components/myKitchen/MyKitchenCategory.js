import {useEffect, useState} from "react";
import MyKitchenAddProductForm from "./MyKitchenAddProductForm";
import MyKitchenProduct from "./MyKitchenProduct";
import {connect} from "react-redux";


const MyKitchenCategory = ({title, productType, products}) => {
    const [showList, setShowList] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [productsArray, setProductsArray] = useState([])
    useEffect(() => {
        if (products !== null) {
           // const array = products.filter(el => el.element.type == "meat")
           //  console.log(array)
           setProductsArray(products.filter(el => el.element.type === productType))
        }
    }, [products, productType])
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

    return (
        <section className="kitchenCtg">
            <div className="kitchenCtg__title">
                {showList ? <i className="fas fa-chevron-up" onClick={handleChangeShowList}/> :
                    <i className="fas fa-chevron-down" onClick={handleChangeShowList}/>}
                <h2>{title}</h2>
                {showAddForm ? <i className="fas fa-times" onClick={handleChangeShowAddForm}/> :
                    <i className="fas fa-plus" onClick={handleChangeShowAddForm}/>}
            </div>
            {showAddForm && <MyKitchenAddProductForm productType={productType}/>}
            {showList && <section className="kitchenCtg__list">
                {productsArray.map(el => <MyKitchenProduct key={el.id} prod={el.element} id={el.id}/>)}
            </section>}
        </section>
    )
}
const mapStateToProps = state => ({
    products: state.products
})
export default connect(mapStateToProps)(MyKitchenCategory)