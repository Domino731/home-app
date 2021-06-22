import {useEffect, useState} from "react";
import {deleteDataFirestore} from "../../functions/deleteDataFirestore";
import {updateDataFirestore} from "../../functions/updateDataFirestore";
import {getUnit} from "../../functions/getUnit";
import {connect} from "react-redux";
import {db} from "../../fireBase/fireBase";


const MyKitchenProduct = ({prod, id, username}) => {
    const [flag, setFlag] = useState(true)
    const [successfulUpdate, setSuccessfulUpdate ] = useState(false)
    const [newAmount, setNewAmount] = useState(prod.amount)
    const [icon, setIcon] = useState("")
    useEffect(()=>{
        db.collection("productsRendering").where("productType", "==", `${prod.type}`).get().then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => (
                doc.data().icon
            ));
           setIcon(data[0])
        });
    },[])
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
        if(newAmount === 0){
            setNewAmount(0)
        }
        else{
        setNewAmount(prev => prev - 1)
    }
    }
    const handleClose = () => {
        setSuccessfulUpdate(true)
        setTimeout(()=>{
            setFlag(true)
            setSuccessfulUpdate(false)
        }, 650)

    }
    return (
        <>
         <section className="kitchenProduct">
             <i className={icon}/>
            <strong className="kitchenProduct__name" onClick={handleChangeFlag}>{prod.name}</strong>
            <div className="kitchenProduct_amount" onClick={handleChangeFlag}>
                {prod.amount > 0 && <>
                <strong>
                    {prod.amount !== "" ? prod.amount : "Brak"}
                </strong>

                <strong>{getUnit(prod.unit, prod.amount)}</strong>
                </>}
                {prod.amount === 0 && <strong>Brak</strong>}
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