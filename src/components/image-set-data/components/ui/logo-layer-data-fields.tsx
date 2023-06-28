"use client";
import { useState } from "react";
import {ImageAssetLayerDataType} from "@/components/types/image-asset-layer-data-type";



interface ChildProps {
  assetData:ImageAssetLayerDataType|undefined,
  onBlur:(value:string,id:number|undefined,key:string)=>void,
}

export default function LogoLayerDataFields(props:ChildProps){
  const [ heightPosition, setHeightPosition] = useState(props.assetData?.height || 0)
  const [ xPosition, setXPosition ] = useState(props.assetData?.xPosition || 0);
  const [ yPosition, setYPosition ] = useState(props.assetData?.yPosition || 0);
  const [ id, setId ] = useState(props.assetData?.id);

 

  return(
    <>
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-2">
      <section>
        <label htmlFor="height" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Height
        </label>
        <input
          type="number"
          name="height"
          value={heightPosition}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          onChange={(e)=>{
            let v = parseInt(e.currentTarget.value);
            if (isNaN(v)){
              v=0;
            }
            setHeightPosition(v);
          }}
          onBlur={(e)=>props.onBlur(e.currentTarget.value,id,"height")}
        />
      </section>
      <section>
        <label htmlFor="xposition" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          X-Position
        </label>
        <input
          type="number"
          name="xposition"
          value={xPosition}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          onChange={(e)=>{
            let v = parseInt(e.currentTarget.value);
            if (isNaN(v)){
              v=0;
            }
            setXPosition(v);
          }}
          onBlur={(e)=>props.onBlur(e.currentTarget.value,id,"xposition")}
        />
      </section>
      <section>
        <label htmlFor="yposition" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Y-Position
        </label>
        <input
          type="number"
          name="yposition"
          value={yPosition}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          onChange={(e)=>{
            let v = parseInt(e.currentTarget.value);
            if (isNaN(v)){
              v=0;
            }
            setYPosition(v);
          }}
          onBlur={(e)=>props.onBlur(e.currentTarget.value,id,"yposition")}
        />
      </section>
     
    </div>
      

    </>
  );
}