"use client";
import {useState, useEffect } from "react";
import { ImageSetDataType } from "../types/image-set-data-type";
import AvatarLevelData from "./components/ui/avatar-level-data";
import ImageMainLevelData from "./components/ui/main-level-data";

interface ChildProps {
  imageSetDataToEdit: ImageSetDataType,
  docId:string,
}

export default function ImageSetData(props:ChildProps){
  const [ imageData, setImageData ] = useState<ImageSetDataType>(props.imageSetDataToEdit)
  

  return (
    <>
    <ImageMainLevelData data={imageData} docId={props.docId}/>
    <AvatarLevelData data={imageData.avatars}  docId={props.docId} />
    
    </>
  );
}