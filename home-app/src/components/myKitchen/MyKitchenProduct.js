//component displaying a single product, is rendered in MyKitchenCategory component

import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {db} from "../../fireBase/fireBase";
import {deleteDataFirestore} from "../../functions/deleteDataFirestore";
import {updateDataFirestore} from "../../functions/updateDataFirestore";
import {getUnit} from "../../functions/getUnit";


// props //
// prod --> actual product and information about him
// id --> product id, used in update or delete product functions
// username --> current username, used in update or delete product functions
const MyKitchenProduct = ({prod, id, username}) => {

    //flag that allows you to display a form to edit the recipe
    const [flag, setFlag] = useState(true)

    //state which adds a class responsible for animations in the product management
    const [successfulUpdate, setSuccessfulUpdate] = useState(false)

    //state holding new amount of product
    const [newAmount, setNewAmount] = useState(prod.amount)

    //state containing the icon that is downloaded when the component is mounted
    const [icon, setIcon] = useState("")

    //getting the icon
    useEffect(() => {
        db.collection("productsRendering")
            .where("productType", "==", `${prod.type}`)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map(doc => (
                    doc.data().icon
                ));
                setIcon(data[0])
            });
    }, [])


    //function which shows or hide product management
    const handleChangeFlag = () => {
        if (flag) {
            setFlag(false)
        } else {
            setFlag(true)
        }
    }

    //function which changes the amount state
    const handleChangeAmount = (e) => setNewAmount(e.target.value)

    //function which increase the amount state
    const handleIncrease = () => {
        setNewAmount(prev => prev + 1)
    }

    //function which decrease the amount state
    const handleDecrease = () => {
        console.log(true)
        if (newAmount === 0) {
            setNewAmount(0)
        } else {
            setNewAmount(prev => prev - 1)
        }
    }

    //functions which hide  product management
    const handleClose = () => {
        setSuccessfulUpdate(true)
        setTimeout(() => {
            setFlag(true)
            setSuccessfulUpdate(false)
        }, 650)

    }


    return (
        <>
            <section className="kitchenProduct" onClick={handleChangeFlag}>

                {/*icon from firestore*/}
                <i className={icon}/>
                <strong className="kitchenProduct__name">{prod.name}</strong>
                <div className="kitchenProduct_amount">

                    {/*If the amount is 0, display a message that the quantity is missing*/}
                    {prod.amount > 0 && <>
                        <strong>
                            {prod.amount !== "" ? prod.amount : "Brak"}
                        </strong>

                        <strong>{getUnit(prod.unit, prod.amount)}</strong>
                    </>}
                    {prod.amount === 0 && <strong>Brak</strong>}


                </div>
            </section>

            {/*product management is displayed when you click on a product*/}
            {flag === false &&
            <section className={`kitchenProductManagement ${successfulUpdate && "successfulProductUpdate"}`}>

                <h3 className="management__title"><i className="fas fa-times-circle" onClick={handleChangeFlag}/> Edytuj
                </h3>
                <div className="management__amount">

                    {/*changing the amount*/}
                    <button onClick={handleIncrease}><i className="fas fa-plus-circle"/></button>
                    <input type="number" placeholder="nowa ilość" value={newAmount} onChange={handleChangeAmount}/>
                    <button onClick={handleDecrease}><i className="fas fa-minus-circle"/></button>

                </div>
                <div className="management__actions">

                    {/*deleting product*/}
                    <button onClick={() => deleteDataFirestore(id, username, "products")}>Usuń produkt</button>

                    {/*updating product*/}
                    <button
                        onClick={() => updateDataFirestore(id, username, "products", {amount: newAmount}, handleClose)}>Zapisz
                        produkt
                    </button>
                </div>
            </section>}
        </>
    )
}
//the username so that the function knows for which user to send the updated product
const mapStateToProps = state => ({
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyKitchenProduct)