import {db} from "../fireBase/fireBase";

export const renderByFirebase = (data,set) => {
    db.collection(data).get().then((querySnapshot) => {
        let arr = []
        querySnapshot.docs.map(doc => (
            arr.push(doc.data().path)
        ));
        set(arr)
    });
}