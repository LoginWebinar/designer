"use client";
import {useState, useEffect } from "react";
import { ImageMainDataType } from "../../../types/image-main-data-type";
import InputField from "@/components/ui/input-field";
import TextAreaField from "@/components/ui/text-area-field";
import CheckBoxField from "@/components/ui/checkbox-field";
import UseGetImageSet from "../hooks/use-update-imageset";
import AdTypesField from "./ad-types-field";

interface ChildProps {
  data: ImageMainDataType|undefined,
  docId:string,
}

export default function ImageMainLevelData(props:ChildProps){
  const [ title,setTitle]=useState("");
  const [ description, setDescription ]=useState("");
  const [ displayIsNew, setDisplayIsNew ] = useState(false);
  const [ displayPublished, setDisplayPublished ] = useState(false);
  const [ keywords,setKeywords] = useState("");
  const [ adTypes, setAdTypes ] = useState<string[]>([]);

  const updateImageSet = UseGetImageSet();

  useEffect(()=>{
    if (props.data!=undefined){
      setTitle(props.data?.title);
      setDescription(props.data?.description);
      setDisplayIsNew(props.data?.displayIsNew);
      setDisplayPublished(props.data?.isPublished);
      setKeywords(props.data?.keywords);
      setAdTypes(props.data.adType);
    }else{
      setTitle(()=>"");
      setDescription(()=>"");
      setKeywords(()=>"");
      setAdTypes(()=>[]);
      setDisplayIsNew(()=>false);
      setDisplayPublished(()=>false);
    }

  },[props.data]);

  async function updateTitle(value:string){
    let data = { title : value};
    updateImageSet(props.docId, data);
  }

  async function updateDescription(value:string){
    let data = { description : value};
    updateImageSet(props.docId, data);
  }

  async function updateKeywords(value:string){
    let data = { keywords : value};
    updateImageSet(props.docId, data);
  }

  async function updateWhatsNew(value:boolean){
    setDisplayIsNew(()=>value);
    let data = { displayIsNew : value};
    updateImageSet(props.docId, data);
  }

  async function updatePublished(value:boolean){
    setDisplayPublished(()=>value);
    let data = { isPublished : value};
    updateImageSet(props.docId, data);
  }

  async function updateAdTypes(values:string[]){
    //console.log(values);
    let data = { adType : values };
    updateImageSet(props.docId, data);
  }

  return (
    <>
    <div className="bg-gray-800 p-6 rounded-md text-gray-200 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="col-span-full">
        <h2>Image Set ID: {props.docId}</h2>
      </div>
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
        <CheckBoxField title="Published" checked={displayPublished} onChange={updatePublished} details="Do not checked until everything has been uploaded" />
      </div>
    
    </div>
    </>
  )
}
