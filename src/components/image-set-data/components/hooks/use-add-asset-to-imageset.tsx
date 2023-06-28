import { db } from "../../../utils/firebase-app";
import { addDoc,collection } from "firebase/firestore";
import { ImageAssetDataType } from "@/components/types/image-asset-data-type";
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

const UseAddAssetToImageset= () => { 

  const addAssetToImageset = async (dezziDocId:string, assetDocId:string,data:ImageAssetDataType) =>{

    let docId:string="";

    try {
      const docRef = await addDoc(collection(db,"dezziSets",dezziDocId,"assets"),data);
      docId = docRef.id;
      return (docId);
      
    } catch (error) {
      console.log("hook:dezzieSet:add",error);
    }
    
    
  }


  return addAssetToImageset
}

export default UseAddAssetToImageset;