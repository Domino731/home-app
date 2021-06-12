import {addDataToFirestore} from "../../functions/addDataToFirestore";

export const MyKitchenBar = () => {
    return (
        <section>
            <div className="kitchenBar" >
                <h1>Lodówka</h1><h1>Lodówka</h1>
                <span/>
                <span/>
            </div>
            <span onClick={addDataToFirestore}>asddddddddddddddddddddd</span>
        </section>
    )
}