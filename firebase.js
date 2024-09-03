import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword,
     signOut, } from "firebase/auth";
import {
    addDoc, 
    collection, 
    getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";




const firebaseConfig = {
  apiKey: "AIzaSyC-cr5dSLLL9kTiOTgrL_Z2fZxDQ6ENhCY",
  authDomain: "netflix-clone-fd69b.firebaseapp.com",
  projectId: "netflix-clone-fd69b",
  storageBucket: "netflix-clone-fd69b.appspot.com",
  messagingSenderId: "1012951172462",
  appId: "1:1012951172462:web:12e9d98afce88c1d056d7f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
   try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    });
   } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const login = async (email, password)=>{
    try {
      await  signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

    const logout = ()=>{
        signOut(auth);
    }

}
const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}; 


