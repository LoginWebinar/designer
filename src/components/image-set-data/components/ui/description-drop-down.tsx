"use client";
import { useState,useEffect } from "react";
import { ThumbnailDataType } from "@/components/types/thumbnail-data-type"

interface ChildProps {
  thumbnailData: ThumbnailDataType|undefined,
  onBlur:(value:string,id:number)=>void,
}


export default function DescriptionDropDown(props:ChildProps){
  const [description, setDescription] = useState(props.thumbnailData?.description);
  const [ id,setId ] = useState(props.thumbnailData?.id);

  useEffect(()=>{
    /**
     * because this appears edit to edit, we need to use the useEffect
     * to update the state values
     */
    setDescription(()=>props.thumbnailData?.description)
    setId(()=>props.thumbnailData?.id);
    
  },[props.thumbnailData])
  
  

  return (
      <section>
        <label htmlFor="description" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          Graphic Type
        </label>
        <select
          name="description"
          value={description}
          className="block w-full rounded-md border-0 py-1 pl-3 pr-3 bg-gray-600 text-gray-200 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e)=>setDescription(e.currentTarget.value)}
          onBlur={(e)=>props.onBlur(e.currentTarget.value,id!)}
          >
          <option>Post</option>
          <option>Mobile, Desktop Ad</option>
          <option>Mobile, Skyscraper</option>
        </select>
      </section>
    
  )

}