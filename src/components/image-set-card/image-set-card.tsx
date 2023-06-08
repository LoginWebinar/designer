"use client";
import { ImageSetDataType } from "../../components/types/image-set-data-type";
import { ThumbnailCarousel } from "./components/ui/thumbnail-carousel"
import { ModelAvatar } from "./components/ui/model-avatar";


interface ChildProps {
  imageCardData: ImageSetDataType,
  onClick:any,
}


export default function ImageSetCard (props:ChildProps){
  
  return(
    <>
  
        <div className="max-w-[240px] md:max-w-xs mx-2 p-2 bg-stone-800 border border-gray-700 rounded-lg shadow">
          
          <ThumbnailCarousel thumbnails={props.imageCardData.thumbnails} />
          
          <div>
            <h3 className="text-sm font-medium text-gray-100">{props.imageCardData.title}</h3>
            <p className="text-sm mt-2 italic text-gray-300">{props.imageCardData.description}</p>            
            <span className="inline-flex my-4 w-14 items-center rounded-md bg-pink-100 px-1.5 py-0.5 text-xs font-medium text-pink-700">Models</span>
            
             <ModelAvatar avatars={props.imageCardData.avatars}/>
            
            <div className="text-center">
              <button className="rounded-full w-40 text-white bg-amber-500 hover:bg-amber-400 hover:text-slate-900 px-4 py-2 mt-4 mb-4" value={props.imageCardData.objectID} 
              onClick={(e)=>{
                props.onClick(e.currentTarget.value);
              }}
              >
              Edit
              </button>
            </div>
          </div>
        </div>
  
  </>
  )
}