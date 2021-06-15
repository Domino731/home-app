import {useState} from "react";
import {deleteDataInFirestore} from "../../functions/deleteDataInFirestore";
import {connect} from "react-redux";


const MyKitchenProduct = ({prod, id, username}) => {
    const [flag, setFlag] = useState(true)

    const handleChangeFlag = () => {
        if(flag){
            setFlag(false)
        }
        else{
            setFlag(true)
        }
    }
    return (
        <>
         <section className="kitchenProduct">
            <i className="fas fa-drumstick-bite"/>
            <strong className="kitchenProduct__name" onClick={handleChangeFlag}>{prod.name}</strong>
            <div className="kitchenProduct_amount">
                <strong>{prod.amount}</strong>
                <strong>{prod.unit}</strong>
            </div>
        </section>
            {flag === false && <section className="kitchenProductManagement">
               <h3 className="management__title"><i className="fas fa-times-circle" onClick={handleChangeFlag}/> Edytuj</h3>
                <div className="management__amount">
                    <i className="fas fa-plus-circle"/>
                    <input type="number" placeholder="nowa ilość"/>
                    <i className="fas fa-minus-circle"/>
                </div>
                <div className="management__actions">
                    <strong onClick={() => deleteDataInFirestore(id, username, "products")}>Usuń produkt</strong>
                    <strong>Zapisz produkt</strong>
                </div>
            </section>}
        </>
    )
}
const mapStateToProps = state => ({
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyKitchenProduct)