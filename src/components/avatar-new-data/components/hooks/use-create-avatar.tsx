import { db } from "@/components/utils/firebase-app";
import { collection,addDoc,Timestamp,updateDoc,doc, } from "firebase/firestore";
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

const UseCreateAvatar = () => { 

  const createAvatar = async (description:string,uploadedFaceURL:string,uploadedFullBodyURL:string,dndSecrets:string,gender:string,race:string) =>{
    let docId:string="";
    const data:FireStoreAvatarDataType = {
      description: description,
      url: uploadedFullBodyURL,
      faceUrl: uploadedFaceURL,
      dndSecrets: dndSecrets,
      gender: gender,
      race: race,
      runningCount:0,
      dezzisSetsDocId:[],
      createdTimeStamp: Timestamp.now(),
    };
    try {
      const docRef = await addDoc(collection(db,"avatars"),data);
      docId = docRef.id;
      return (docId);
      
    } catch (error) {
      console.log("hook:avatar:add",error);
    }

  }
  return createAvatar;
}

export default UseCreateAvatar;