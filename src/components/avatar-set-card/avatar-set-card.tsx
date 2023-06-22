"use client";
import {useState, useEffect } from "react";
import { AvatarSetDataType } from "../types/avatar-set-data-type";


interface ChildProps {
  imageCardData: AvatarSetDataType,
  onClick:(docId:string,avatar:AvatarSetDataType)=>void,
  actionWord:string,
}

export default function ImageSetData(props:ChildProps){
  const [ avatarData, setAvatarData ] = useState<AvatarSetDataType>(props.imageCardData)
  

  return (
    <>
      <div className="max-w-[320px] m-2 p-2 bg-stone-800 border border-gray-700 rounded-lg shadow flex flex-row place-items-center">
        <img src={props.imageCardData.url} className="max-h-48 h-48 md:h-32" aria-hidden="true" alt={props.imageCardData.description} />

        <div className="ml-2 place-self-start ">
          <p className="text-sm mt-2 italic text-gray-300 text-clip">{props.imageCardData.description.substring(0,150)}</p>
          <button 
            className="rounded-full w-24 text-xs text-white bg-amber-500 hover:bg-amber-400 hover:text-slate-900 px-1 py-1 mt-4" 
            value={props.imageCardData.objectID} 
            onClick={(e)=>{
              props.onClick(e.currentTarget.value,avatarData);
            }}
          >
            {props.actionWord}
          </button>
        </div>
        
      </div>
    
    </>
  );
}