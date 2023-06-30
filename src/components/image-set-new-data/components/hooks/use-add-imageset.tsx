import { db } from "../../../utils/firebase-app";
import { addDoc,collection } from "firebase/firestore";
import { DezzisetsDataType } from "@/components/types/firestore-dezzisets-data-type";
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

const UseAddImageset= () => { 

  const addImageset = async (title:string,description:string,keywords:string,adTypes:string[],displayIsNew:boolean) =>{

    let docId:string="";

    try {
      const data = {title:title,description:description,keywords:keywords,adType:adTypes,displayIsNew:displayIsNew,isPublished:false,thumbnails:[],avatars:[]} as DezzisetsDataType;
      const docRef = await addDoc(collection(db,"dezziSets"),data);
      docId = docRef.id;
      return (docId);
      
    } catch (error) {
      console.log("hook:dezziSets:add",error);
    }
    
  }


  return addImageset
}

export default UseAddImageset;