"use client";
import { useState,useEffect } from "react";
import { ThumbnailDataType } from "@/components/types/thumbnail-data-type"

interface ChildProps {
  thumbnailData: ThumbnailDataType|undefined,
  onBlur:(value:string,id:number)=>void,
}

export default function CanvasDropDown(props:ChildProps){
  const [canvas, setCanvas] = useState(props.thumbnailData?.size);
  const [ id,setId ] = useState(props.thumbnailData?.id);

  useEffect(()=>{
    /**
     * because this appears edit to edit, we need to use the useEffect
     * to update the state values
     */
    setCanvas(()=>props.thumbnailData?.size);
    setId(()=>props.thumbnailData?.id);
    
  },[props.thumbnailData])
  
  

  return (
      <section>
        <label htmlFor="canvas" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Canvas Size
        </label>
        <select
          name="canvas"
          value={canvas}
          className="block w-full rounded-md border-0 py-1 pl-3 pr-3 bg-gray-600 text-gray-200 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e)=>setCanvas(e.currentTarget.value)}
          onBlur={(e)=>props.onBlur(e.currentTarget.value,id!)}
          >
          <option>1200x1200</option>
          <option>300x250</option>
        </select>
      </section>
    
  )

}