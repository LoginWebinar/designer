"use client";
import {useState, useEffect } from "react";
import InputField from "@/components/ui/input-field";
import TextAreaField from "@/components/ui/text-area-field";
import SpinnerForButton from "@/components/spinners/spinner-for-button";
import { ImageAssetDataType } from "../types/image-asset-data-type";
import AdTypesField from "../image-set-data/components/ui/ad-types-field";
import CheckBoxField from "@/components/ui/checkbox-field";

import { ImageSetDataType } from "@/components/types/image-set-data-type";

import UseAddImageset from "./components/hooks/use-add-imageset";

interface ChildProps {
  toggleShow: any;
  createdDezziData: (docid:string,data:ImageSetDataType)=>void;
}


export default function ImagesetNewData(props:ChildProps){
  const { toggleShow } = props;
  const [buttonSpinnerVisible,setButtonSpinnerVisible] = useState(false);
  const [ saveEnabled,setSaveEnabled ] =useState(false);
  const [ title,setTitle]=useState("");
  const [ description, setDescription ]=useState("");
  const [ displayIsNew, setDisplayIsNew ] = useState(false);  
  const [ keywords,setKeywords] = useState("");
  const [ adTypes, setAdTypes ] = useState<string[]>([]);

  const addImageset = UseAddImageset();

  useEffect(()=>{
    let isDataReady=false;
 
    if (title!="" && description!="" && keywords!="" && adTypes.length>0 ){
      isDataReady=true;
    }

    if (isDataReady){
      setSaveEnabled(()=>true);
    }else{
      setSaveEnabled(()=>false);
    }

  },[title,description,keywords,adTypes])

  async function saveImageset(){
    /**
     * save the Imageset data into the table
     * 
     */
    setButtonSpinnerVisible(()=>true);
    const newDocId = await addImageset(title,description,keywords,adTypes,displayIsNew);
    const newData = {objectID:newDocId,title:title,description:description,keywords:keywords,adType:adTypes,displayIsNew:displayIsNew,isPublished:false,avatars:[], thumbnails:[]} as ImageSetDataType;
    props.createdDezziData(newDocId!,newData)

  }

  function updateTitle(value:string){
    /**
     * required function, does not do anything
     */
  }

  function updateDescription(value:string){
    /**
     * required function, does not do anything
     */
  }

  function updateKeywords(value:string){
    /**
     * required function, does not do anything
     */
  }

  function updateWhatsNew(value:boolean){
    /**
     * Updates the whats new checkbox state
     */
    setDisplayIsNew(()=>value);
  }

 

  function updateAdTypes(values:string[]){
    /**
     * required function, does not do anything
     */
    setAdTypes(()=>values);
    
  }


  return (
    <>
    <div className="bg-gray-800 p-6 rounded-md text-gray-200">
        <div className="flex justify-between">
          <h2>New Dezzi Image set</h2>
          
          <div>
            <button
                type="button"
                className="inline-flex rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                onClick={() => toggleShow()}
            >
                Cancel
            </button>
            
            <button
                type="button"
                disabled={!saveEnabled}
                className="ml-2 inline-flex rounded-md bg-cyan-600 px-2 py-1 text-sm font-semibold text-white shadow-sm enabled:hover:bg-cyan-500 sm:w-auto disabled:opacity-50 disabled:hover:none"
                onClick={() => saveImageset()}
            >
                <SpinnerForButton show={buttonSpinnerVisible}/> Save
            </button>
          </div>
          
          
        </div>
        
        <div className="text-gray-200 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 gap-y-4">
            <InputField title="Title" value={title} onChange={setTitle} onBlur={updateTitle} />
            <div className="mt-2 sm:mt-4"></div>
            <TextAreaField title="Description" value={description} onChange={setDescription} onBlur={updateDescription}/>
          </div>
          <div className="sm:col-span-2">
            <TextAreaField title="Keywords" value={keywords} onChange={setKeywords} onBlur={updateKeywords}/>
            <div className="mt-2 sm:mt-4"></div>
            <AdTypesField  adTypeArray={adTypes} onChange={updateAdTypes} />
          </div>
          <div className="sm:col-span-4 lg:col-span-2">
            <CheckBoxField title="Show in Whats New" checked={displayIsNew} onChange={updateWhatsNew} details="If Checked, will display in the Whats New area" />
          </div>
        </div>
       
      </div>
    </>
  )

}