"use client";
import { useState, useEffect } from "react";

interface ChildProps {
  value:string|undefined,
  onChange:any,
}

const _bold ="bold";
const _italic = "italic";
const _smcap= "small-caps";

export default function FontEmphasis(props:ChildProps ) {
  const [ fontEmphasis, setFontEmphasis] = useState(props.value);
  const [ textBold,setTextBold ] =useState(false);
  const [ textSmCaps, setTextSmCaps ]= useState(false);
  const [ textItalic, setTextItalic ] = useState(false);

  const textBoldClickHandler = (e:boolean) =>{
    setTextBold(p=>e);
    let _fontEmphasis="";
    if (e){
      _fontEmphasis=_bold;
    }
    if (textSmCaps){
      _fontEmphasis= _fontEmphasis+" "+_smcap;
    }
    if (textItalic){
      _fontEmphasis= _fontEmphasis+" "+_italic;
    }
    _fontEmphasis.trim();
    props.onChange(_fontEmphasis);
  };

  const textSmCapClickHandler = (e:boolean) =>{
    setTextSmCaps(p=>e);
    let _fontEmphasis="";
    if (textBold){
      _fontEmphasis=_bold;
    }
    if (e){
      _fontEmphasis= _fontEmphasis+" "+_smcap;
    }
    if (textItalic){
      _fontEmphasis= _fontEmphasis+" "+_italic;
    }
    _fontEmphasis.trim();
    props.onChange(_fontEmphasis);
  };

  const textItalicClickHandler = (e:boolean) =>{
    setTextItalic(p=>e);
    let _fontEmphasis="";
    if (textBold){
      _fontEmphasis=_bold;
    }
    if (textSmCaps){
      _fontEmphasis= _fontEmphasis+" "+_smcap;
    }
    if (e){
      _fontEmphasis= _fontEmphasis+" "+_italic;
    }
    _fontEmphasis.trim();
    props.onChange(_fontEmphasis);
  };

  useEffect(()=>{
    
    let position=0;
    if (props.value!=undefined){
      position = props.value.search(_bold);
    }
    
    if (position!=-1){
      setTextBold(p=>true);
    }else{
      setTextBold(p=>false);
    }
    if (props.value!=undefined){
      position = props.value.search(_italic);
    }
    if (position!=-1){
      setTextItalic(p=>true);
    }else{
      setTextItalic(p=>false);
    }
    if (props.value!=undefined){
      position = props.value.search(_smcap);
    }
    if (position!=-1){
      setTextSmCaps(p=>true);
    }else{
      setTextSmCaps(p=>false);
    }

  },[props.value])


  return (
    <>
    <fieldset>
      <legend className="sr-only">Font Emphasis</legend>
      <div className="space-y-1">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="text-bold"
              aria-describedby="text-bold"
              name="text-bold"
              type="checkbox"
              checked={textBold}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:text-indigo-300 focus:ring-indigo-600"
              onChange={(e) => textBoldClickHandler(e.currentTarget.checked)}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="text-bold" className="font-medium text-gray-200">
              Bold
            </label>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="text-italic"
              aria-describedby="text-italic"
              name="text-italic"
              type="checkbox"
              checked={textItalic}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:text-indigo-300 focus:ring-indigo-600"
              onChange={(e) => textItalicClickHandler(e.currentTarget.checked)}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="text-italic" className="font-medium text-gray-200">
              Italic
            </label>
            
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="text-smcaps"
              aria-describedby="text-smcaps"
              name="text-smcaps"
              type="checkbox"
              checked={textSmCaps}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:text-indigo-300 focus:ring-indigo-600"
              onChange={(e) => textSmCapClickHandler(e.currentTarget.checked)}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="text-smcaps" className="font-medium text-gray-200">
              Small Caps
            </label>
            
          </div>
        </div>
      </div>
    </fieldset>
    </>
  )
}
 