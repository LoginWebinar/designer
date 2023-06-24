import { db } from "../../../utils/firebase-app";
import { getDoc,doc } from "firebase/firestore";
import { ImageAssetDataType } from "../../../types/image-asset-data-type";

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

const UseGetDezziAsset = () => { 
  const getDezziAsset = async (docId:string,assetDocId:string) =>{
    const docRef = doc(db,"dezziSets",docId,"assets",assetDocId);
    try {
      const myImageSnapDetails = await getDoc(docRef);
      if(myImageSnapDetails.exists()) {
          const _data = myImageSnapDetails.data() as ImageAssetDataType;
          return _data;
      }
    }catch(error){
        console.log(error);
    }
    await getDoc(docRef);


  }
  return getDezziAsset;
}

export default UseGetDezziAsset;