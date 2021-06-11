import {MyKitchenBar} from "./MyKitchenBar";
import {MyKitchenCategory} from "./MyKitchenCategory";

export const MyKitchen = () => {
    return (
        <section className="container">
            <MyKitchenBar/>
            <MyKitchenCategory category="Mięso"/>
        </section>
    )
}