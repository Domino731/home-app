//function that retrieves documents from the collection that is used to render the items(MyRecipes, MyKitchen)
import {db} from "./fireBase";

// params //
// collection --> name of the collection from which you want to download
// set --> sets the state
export const renderByFirebase = (collection,set) => {
    db.collection(collection).get().then((querySnapshot) => {
        let arr = []
        querySnapshot.docs.map(doc => (
            arr.push(doc.data().path)
        ));
        set(arr)
    });
}