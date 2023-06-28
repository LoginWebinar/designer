import { db } from "../../../utils/firebase-app";
import { doc,updateDoc,getDoc } from "firebase/firestore";
import { FireStoreAvatarDataType } from "@/components/types/firestore-avatar-data-type";
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

const UseAddDezziIdToAvatar = () => { 

  const addDezziIdToAvatar = async (avatarDocId:string, dezziId:string) =>{
    const docRef = doc(db,"avatars",avatarDocId);
    
    try {
      const myImageSnapDetails = await getDoc(docRef);
      if(myImageSnapDetails.exists()) {
          const data = myImageSnapDetails.data() as FireStoreAvatarDataType;

          const _docData=data.dezzisSetsDocId as string[];
          _docData.push(dezziId);
          const docData= {dezzisSetsDocId: _docData};
          await updateDoc(docRef,docData);

      }
      
    } catch (error) {
      console.log(error);
    }
  }


  return addDezziIdToAvatar;
}

export default UseAddDezziIdToAvatar;