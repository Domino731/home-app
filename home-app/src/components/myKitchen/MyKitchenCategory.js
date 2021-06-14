import {useState} from "react";
import MyKitchenAddProductForm from "./MyKitchenAddProductForm";

export const MyKitchenCategory = ({category, productType}) => {
    const [showList, setShowList] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
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
                <h2>{category}</h2>
                {showAddForm ? <i className="fas fa-times" onClick={handleChangeShowAddForm}/> :
                    <i className="fas fa-plus" onClick={handleChangeShowAddForm}/>}
            </div>
            {showAddForm && <MyKitchenAddProductForm productType={productType}/>}
            {showList && <section className="kitchenCtg__list"></section>}
        </section>
    )
}