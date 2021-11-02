import { db } from "./fireBase";
export const getRecipesOfParticularType = (type, userUid, saveData) => {
    return db.collection(`users/${userUid}/recipes`)
    .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        saveData(data);
    });
}