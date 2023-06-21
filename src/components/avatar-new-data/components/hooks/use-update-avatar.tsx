import { db } from "../../../utils/firebase-app";
import { doc,updateDoc } from "firebase/firestore";
 
/**
 * Created by: Rob Helmstetter
 * Date: 4/18/23
 * 
 * This hook will update the firestore user table with the entered values
 * related to the company that the user has entered.
 * 
 * Updates:
 * 
*/ 

const UseUpdateAvatar = () => { 

  const updateAvatar = async (docId:string, docData:object) =>{
    const docRef = doc(db,"avatars",docId);
    try {
      await updateDoc(docRef,docData);
    } catch (error) {
      console.log(error);
    }


  }
  return updateAvatar;
}

export default UseUpdateAvatar;