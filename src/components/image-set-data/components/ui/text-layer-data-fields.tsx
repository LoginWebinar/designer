"use client";
import { useState } from "react";
import {ImageAssetLayerDataType} from "@/components/types/image-asset-layer-data-type";
import FontEmphasis from "./font-emphasis";


interface ChildProps {
  assetData:ImageAssetLayerDataType|undefined,
  
}

export default function TextLayerDataFields(props:ChildProps){
  const [ lineNumber, setLineNumber ] = useState(props.assetData?.line);
  const [ xPosition, setXPosition ] = useState(props.assetData?.xPosition);
  const [ yPosition, setYPosition ] = useState(props.assetData?.yPosition);
  const [ fontSize, setFontSize ] = useState(props.assetData?.fontSize);
  const [ color, setColor ]= useState(props.assetData?.textColor);
  const [ align, setAlign ] = useState(props.assetData?.textAlign);
  const [ family, setFamily ] = useState(props.assetData?.fontFamily);
  const [ emphasis, setEmphasis ] = useState(props.assetData?.fontEmphasis);

  const textFontEmphasisOnChangeHandler =(value:string)=>{
    setEmphasis(()=>{return value});
    
  }

  const updateXPosition = (value:string) =>{
   
  }

  return(
    <>
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-2">
      <section>
        <label htmlFor="linenumber" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Line Number
        </label>
        <input
          type="text"
          name="linenumber"
          value={lineNumber}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder=""
          onChange={(e)=>setLineNumber(e.currentTarget.value)}
          //onBlur={(e)=>props.onBlur(e.currentTarget.value)}
        />
      </section>
      <section>
        <label htmlFor="xposition" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          X-Position
        </label>
        <input
          type="text"
          name="xposition"
          value={xPosition}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder=""
          onChange={(e)=>setXPosition(parseInt(e.currentTarget.value))}
          //onBlur={(e)=>props.onBlur(e.currentTarget.value)}
        />
      </section>
      <section>
        <label htmlFor="yposition" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Y-Position
        </label>
        <input
          type="text"
          name="yposition"
          value={yPosition}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder=""
          onChange={(e)=>setYPosition(parseInt(e.currentTarget.value))}
          //onBlur={(e)=>props.onBlur(e.currentTarget.value)}
        />
      </section>
      <section>
        <label htmlFor="fontsize" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Font Size
        </label>
        <input
          type="text"
          name="fontsize"
          value={fontSize}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder=""
          onChange={(e)=>setFontSize(e.currentTarget.value)}
          //onBlur={(e)=>props.onBlur(e.currentTarget.value)}
        />
      </section>
      
      <section>
        <label htmlFor="color" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Hex Color
        </label>
        <input
          type="text"
          name="color"
          value={color}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder=""
          onChange={(e)=>setColor(e.currentTarget.value)}
          //onBlur={(e)=>props.onBlur(e.currentTarget.value)}
        />
      </section>
      <section>
        <label htmlFor="alignment" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Alignment
        </label>
        <select
          name="alignment"
          value={align}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e)=>setAlign(e.currentTarget.value)}
          >
          <option>left</option>
          <option>center</option>
          <option>right</option>
        </select>
      </section>
      <section>
        <label htmlFor="family" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Family
        </label>
        <select
          name="family"
          value={family}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e)=>setFamily(e.currentTarget.value)}
          >
          <option>arial</option>
          <option>cursive</option>
          <option>fantasy</option>
          <option>monospace</option>
          <option>serif</option>
          <option>sans-serif</option>
          <option>verdana</option>
        </select>
      </section>
      <section>
        <FontEmphasis value={emphasis} onChange={textFontEmphasisOnChangeHandler} />
      </section>
    </div>
      

    </>
  );
}