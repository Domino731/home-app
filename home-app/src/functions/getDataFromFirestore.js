import {db} from "../fireBase/fireBase";

export const getProductsFromFirestore = () => {
    const unsubscribe = db
        .collection("products")
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            console.log(data)
        })
    return unsubscribe
}
