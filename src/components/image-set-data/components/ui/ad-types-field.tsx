"use client";
import { useState,useEffect } from "react";
import CheckBoxField from "../../../ui/checkbox-field";

interface ChildProps {
  adTypeArray:string[],
  onChange:(values:string[])=>void,
}

let _post=false;
let _mediumRectangle=false;


export default function AdTypesField(props:ChildProps){
  const [ post, setPost ]=useState(false);
  const [ mediumRectangle, setMediumRectangle ]=useState(false);

  useEffect(()=>{
    const d1= props.adTypeArray.indexOf("Post");
    if (d1==-1){
      _post=false;
      setPost(()=>false);
    }else{
      _post=true;
      setPost(()=>true);
    }
    const d2= props.adTypeArray.indexOf("Medium Rectangle");
    if (d2==-1){
      _mediumRectangle=false;
      setMediumRectangle(()=>false);
    }else{
      _post=true;
      setMediumRectangle(()=>true);
    }


  },[props.adTypeArray]);



  function updateOnChange(){
    let data=[];
    if (_post){
      data.push("Post");
    }
    if (_mediumRectangle){
      data.push("Medium Rectangle");
    }
    props.onChange(data);

  }

  function updatePost(value:boolean){
    setPost(()=>value);
    _post=value;
    updateOnChange();
  }

  function updateMediumRectangle(value:boolean){
    setMediumRectangle(()=>value);
    _mediumRectangle=value;
    updateOnChange();
  }

  return (
    <div className="rounded-md px-3 pb-3.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-indigo-600">
      <h3 className="block text-xs px-1.5 font-medium text-gray-200 mb-1">Ad Types</h3>
      <div>
        <CheckBoxField title="Post" checked={post} onChange={updatePost} details="" />
        <CheckBoxField title="Medium Rectangle" checked={mediumRectangle} onChange={updateMediumRectangle} details="" />


      </div>
    </div>
  );
}