import {db} from "./fireBase";

/**
 * fetch data with informations about available content for a specific section (read in docs)
 * @param {*} collection - name of collection
 * @param {*} saveData - function that will save incomming data 
 */
export const renderByFirebase = (collection,saveData) => {
    return  db.collection(collection).get().then((querySnapshot) => {
        const data = []
        querySnapshot.docs.map(doc => (
            data.push(doc.data().path)
        ));
        return saveData(data)
    });
}