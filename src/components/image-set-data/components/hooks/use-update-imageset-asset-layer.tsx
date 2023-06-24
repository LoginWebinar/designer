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

const UseUpdateImageSetAssetLayer = () => { 

  const updateImageSetAssetLayer = async (docId:string, assetDocId:string, docData:object) =>{
    const docRef = doc(db,"dezziSets",docId,"assets",assetDocId);
    try {
      await updateDoc(docRef,docData);
    } catch (error) {
      console.log(error);
    }


  }
  return updateImageSetAssetLayer;
}

export default UseUpdateImageSetAssetLayer;