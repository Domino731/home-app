import {useState} from "react";
import {deleteDataFirestore} from "../../functions/deleteDataFirestore";
import {updateDataFirestore} from "../../functions/updateDataFirestore";
import {connect} from "react-redux";


const MyKitchenProduct = ({prod, id, username}) => {
    const [flag, setFlag] = useState(true)
    const [successfulUpdate, setSuccessfulUpdate ] = useState(false)
    const [newAmount, setNewAmount] = useState(prod.amount)
    const handleChangeFlag = () => {
        if(flag){
            setFlag(false)
        }
        else{
            setFlag(true)
        }
    }
    const handleChangeAmount = (e) => setNewAmount(e.target.value)
    const handleIncrease = () => {
        setNewAmount(prev => prev + 1)
    }
    const handleDecrease = () => {
        console.log(true)
        setNewAmount(prev => prev - 1)
    }
    const handleClose = () => {
        setSuccessfulUpdate(true)
        setTimeout(()=>{
            setFlag(true)
        }, 700)
    }
    return (
        <>
         <section className="kitchenProduct">
            <i className="fas fa-drumstick-bite"/>
            <strong className="kitchenProduct__name" onClick={handleChangeFlag}>{prod.name}</strong>
            <div className="kitchenProduct_amount" onClick={handleChangeFlag}>
                <strong>{prod.amount}</strong>
                <strong>{prod.unit}</strong>
            </div>
        </section>
            {flag === false && <section className={`kitchenProductManagement ${successfulUpdate && "successfulProductUpdate"}`}>
                {/*{flag === false && <section className="kitchenProductManagement successfulProductUpdate">*/}
               <h3 className="management__title"><i className="fas fa-times-circle" onClick={handleChangeFlag}/> Edytuj</h3>
                <div className="management__amount">
                    <button onClick={handleIncrease}><i className="fas fa-plus-circle" /></button>
                    <input type="number" placeholder="nowa ilość" value={newAmount} onChange={handleChangeAmount}/>
                    <button onClick={handleDecrease}><i className="fas fa-minus-circle" /></button>
                </div>
                <div className="management__actions">
                    <button   onClick={() => deleteDataFirestore(id, username, "products")}>Usuń produkt</button>
                    <button onClick={() => updateDataFirestore(id,username, "products", {amount: newAmount}, handleClose)}>Zapisz produkt</button>
                </div>
            </section>}
        </>
    )
}
const mapStateToProps = state => ({
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyKitchenProduct)