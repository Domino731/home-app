import {db} from "../fireBase/fireBase";
export const deleteDataFirestore = (DataId, username, item) => {
     db.collection("users")
         .where(`userName`, `==`, `${username}`)
         .onSnapshot(querySnapshot => {
              const id = querySnapshot.docs.map(doc =>
                  db.collection(`users/${doc.id}/${item}`)
                      .doc(`${DataId}`).delete()

              );
         })
}