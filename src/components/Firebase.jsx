
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
apiKey: "AIzaSyB7JyU3N3Sn1QhknjV4o32FmOXi0IMHo3E",
authDomain: "user-auth-13b30.firebaseapp.com",
projectId: "user-auth-13b30",
storageBucket: "user-auth-13b30.appspot.com",
messagingSenderId: "311406493546",
appId: "1:311406493546:web:16834000ca42a8cfbb6f13"
};

firebase.initializeApp(firebaseConfig); 
export const dataRef =firebase.database();
export const storage = firebase.storage();
export default firebase;





