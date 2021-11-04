import { useEffect, useState } from "react";
import { auth, db } from "../../fireBase/fireBase";
import { deleteDataFirestore } from "../../fireBase/deleteDataFirestore";
import { updateDataFirestore } from "../../fireBase/updateDataFirestore";
import { getUnit } from "../../functions/getUnit";

/**
 * Component which is rendering single product container with ability to display form by which user can edit this product 
 * @param prod - object with data about single product
 * @param id - id of product, needed to update or delete product
 */
const MyKitchenProduct = ({ prod, id, }) => {

    // flag that allows user to toggle form by which user can edit his product (change amount or delete)
    const [flag, setFlag] = useState(true)

    //s tate which adds a class responsible for animations in the product management
    const [successfulUpdate, setSuccessfulUpdate] = useState(false)

    // state with product amount
    const [newAmount, setNewAmount] = useState(prod.amount)

    // state containing the icon that is downloaded from  when the component is mounted 
    const [icon, setIcon] = useState("")

    // get the icon (<i> tag)of product type from 'productsRendering' collection in firestore
    useEffect(() => {
        db.collection("productsRendering")
            .where("productType", "==", `${prod.type}`)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map(doc => (
                    doc.data().icon
                ));
                setIcon(data[0]);
            });
    }, []);

    /** change flag state -> toggle product management form  */
    const handleChangeFlag = () => flag ? setFlag(false) : setFlag(true);

    /** function which is changing the amount state */
    const handleChangeAmount = (e) => setNewAmount(e.target.value);

    /** function which increase the amount state ( +1 ) */
    const handleIncrease = () => setNewAmount(prev => prev + 1);

    /** function which decrease the amount state ( -1 ) */
    const handleDecrease = () => {
        if (newAmount === 0) {
            setNewAmount(0)
        } else {
            setNewAmount(prev => prev - 1)
        }
    }

    //functions which hide  product management
    /** function that changes successfulUpdate state (animation is displayed), and hides management form after delay (650) */
    const handleClose = () => {
        setSuccessfulUpdate(true);
        return setTimeout(() => {
            setFlag(true);
            setSuccessfulUpdate(false);
        }, 650);
    }

    return <>
        <section className="kitchenProduct" onClick={handleChangeFlag}>
            {/*icon of product type*/}
            <i className={icon} />

            {/* product name */}
            <strong className="kitchenProduct__name">{prod.name}</strong>

            {/* product amount */}
            <div className="kitchenProduct_amount">
                {/*If the amount is 0, display a message that the product is missing*/}
                {prod.amount > 0 && <>
                    <strong>
                        {prod.amount ? prod.amount : `Brak`}
                    </strong>

                    <strong>{getUnit(prod.unit, prod.amount)}</strong>
                </>}
                {prod.amount === 0 && <strong>Brak</strong>}
            </div>

        </section>

        {/*product management is displayed when you click on a product*/}
        {flag === false &&
            //  when user successfully change product then change successfulUpdate state -> display animation 
            <section className={`kitchenProductManagement ${successfulUpdate && "successfulProductUpdate"}`}>

                <h3 className="management__title">
                    {/* hide management form */}
                    <i className="fas fa-times-circle" onClick={handleChangeFlag} /> Edytuj
                </h3>

                <div className="management__amount">
                    {/*changing the amount*/}
                    <button onClick={handleIncrease}><i className="fas fa-plus-circle" /></button>
                    <input type="number" placeholder="nowa ilość" value={newAmount} onChange={handleChangeAmount} />
                    <button onClick={handleDecrease}><i className="fas fa-minus-circle" /></button>
                </div>
                
                <div className="management__actions">

                    {/*deleting product*/}
                    <button onClick={() => deleteDataFirestore(id, auth().currentUser.uid, "products")}>Usuń produkt</button>

                    {/*updating product*/}
                    <button
                        onClick={() => updateDataFirestore(id, auth().currentUser.uid, "products", { amount: newAmount }, handleClose)}>Zapisz
                        produkt
                    </button>
                </div>
            </section>}
    </>
}

export default MyKitchenProduct;