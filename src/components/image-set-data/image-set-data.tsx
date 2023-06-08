"use client";
import {useState, useEffect } from "react";
import { ImageSetDataType } from "../types/image-set-data-type";
import { ImageMainDataType } from "../types/image-main-data-type";

import ImageMainLevelData from "./components/ui/main-level-data";

interface ChildProps {
  imageSetDataToEdit: ImageSetDataType|null,
  docId:string,
}

export default function ImageSetData(props:ChildProps){
  const [ imageData, setImageData ] = useState<ImageSetDataType[]|[]>([])
  const [ mainLevelData, setMainLevelData] =useState<ImageMainDataType>()


  useEffect(()=>{
    if (props.imageSetDataToEdit===null){
      setImageData(()=>[]);
    }else{
      setImageData([props.imageSetDataToEdit]);
      
    }
  },[props.imageSetDataToEdit])

  return (
    <>
    <ImageMainLevelData data={imageData[0]} docId={props.docId}/>
    
    </>
  );
}