import { Timestamp } from "@firebase/firestore"

export type FireStoreAvatarDataType ={
  url: string,
  faceUrl:string,
  description:string,
  dndSecrets:string,
  dezzisSetsDocId:[],
  gender:string,
  race:string,
  runningCount:number,
  createdTimeStamp: Timestamp,
}