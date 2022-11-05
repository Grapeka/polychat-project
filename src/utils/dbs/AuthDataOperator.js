import { 
    ref, uploadBytesResumable,
    getDownloadURL
 } from 'firebase/storage';
import {
    collection, doc,
    getDoc, addDoc, setDoc
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import  { firebaseStorage } from './FirebaseStorage';
import { firestoreDb } from './FireStore';
import { getSticker } from './StorageOperator'

export const createRegisterData = async (user ,email, phoneNum, userId, displayName, firstname, lastname) => {
    try {
        await updateProfile( user, {
                displayName: displayName,
                phoneNumber: phoneNum
            }
        );
        console.log("Register: Updated auth profile");
    } catch (error) {
        console.log(error.message);
        throw new Error(`Register: Failed to update auth profile for ${user.email}`);
    }

    try {
        await setDoc( doc(firestoreDb, "User", userId), {
            about: "",
            userId: userId,
            firstname: firstname,
            phoneNumber: phoneNum,
            lastname: lastname,
            displayName: displayName,
            email: email,
            profilePic: "",
            assistantList: [],
            chatList: [],
            emergencyList: [],
        });
        console.log("Register: Updated profile document in Firestore")
    } catch (error) {
        console.log(error.message);
        throw new Error(`Register: Failed to upload profile document to Firestore`);
    }
};

// export const _createRegisterData = ( user ,email, phoneNum, userId, displayName, firstname, lastname, picture) => {

//     const registerStorageRef = ref(firebaseStorage, `/profile/picture/${userId}`);
//     const uploadTask = uploadBytesResumable(registerStorageRef, picture)

//     //Upload to Storage
//     uploadTask.on(
//         (error) => {
//           //Upload Error Handling
//             console.log(error);
//             throw new Error(`Upload Files Failed`);
//         },
//         () => {
//             //Success Uploading
//             getDownloadURL(uploadTask.snapshot.ref)
//                 .then( async (downloadURL) => {

//                     try {

//                         //Update Auth Profile
//                         await updateProfile( user, {
//                                 displayName: displayName,
//                                 photoURL: downloadURL
//                             }
//                         );
//                         console.log(`Files: ${downloadURL}`)
    
//                         //Update Firestore
//                         await setDoc( 
//                             doc(firestoreDb, "User", userId), {
//                                 about: "",
//                                 userId: userId,
//                                 firstname: firstname,
//                                 phoneNumber: phoneNum,
//                                 lastname: lastname,
//                                 displayName: displayName,
//                                 email: email,
//                                 profilePic: downloadURL,
//                                 assistantList: [],
//                                 chatList: [],
//                                 emergencyList: [],
//                             }
//                         );
                        
//                     } catch (e) {
//                         console.log(e);
//                         throw new Error(`Updating Firebase Failed`);
//                     }
                    
                    
//                 });
                    
//             }
//     );


// };