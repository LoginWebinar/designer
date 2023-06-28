import { db } from "../../../utils/firebase-app";
import { doc,updateDoc,getDoc,collection } from "firebase/firestore";
import { FireStoreAvatarDataType } from "@/components/types/firestore-avatar-data-type";
import {ImageAssetDataType} from "@/components/types/image-asset-data-type";
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

const UseAddLayerToAsset = () => { 

  const addLayerToAsset = async (dezziDocId:string,assetDocId:string,assetType:string,assetId:number) =>{
    
    
  }


  return addLayerToAsset;
}

export default UseAddLayerToAsset;