import { db } from "../../../utils/firebase-app";
import { getDoc,doc } from "firebase/firestore";
import { ImageSetDataType } from "../../../types/image-set-data-type";

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

const UseGetImageSet = () => { 
  const getImageSet = async (docId:string) =>{
    const docRef = doc(db,"dezziSets",docId);
    try {
      const myImageSnapDetails = await getDoc(docRef);
      if(myImageSnapDetails.exists()) {
          const _data = myImageSnapDetails.data() as ImageSetDataType;
          return _data;
      }
    }catch(error){
        console.log(error);
    }
    await getDoc(docRef);


  }
  return getImageSet;
}

export default UseGetImageSet;