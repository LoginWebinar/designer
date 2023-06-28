"use client";
import React, {useState, useEffect } from "react";
import { SortableList } from "../../../sortable-list/sortable-list";

import { AvatarDataType } from "@/components/types/avatar-data-type";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import SearchForAvatar from "../modals/search-for-avatar";
import UpdateAvatarData from "../modals/update-avatar-data";
import CreateAvatar from "../modals/create-avatar";

import { AvatarSetDataType } from "@/components/types/avatar-set-data-type";

import UseGetImageSet from "../hooks/use-update-imageset";
import UseAddDezziIdToAvatar from "../hooks/use-add-dezzisid-to-avatar";
import UseRemoveDezziIdfromAvatar from "../hooks/use-remove-dezziid-from-avatar";

interface ChildProps {
  data: AvatarDataType[],
  docId:string,
}

export default function ImageMainLevelData(props:ChildProps){
  const [ avatarData, setAvatarData]=useState<AvatarDataType[]>(props.data);
  const [ showAddAvatar, setShowAddAvatar ] = useState(true);
  const [ showCreateAvatar, setShowCreateAvatar ] = useState(false);
  const [ displayAvatarDataVisible,setDisplayAvatarDataVisible] = useState(false);
  const [ displaySearchAvatarVisible,setDisplaySearchAvatarVisible] = useState(false);
  const [ avatarItem, setAvatarItem ] = useState<AvatarDataType>();
  const [ saveAvatarData, setSaveAvatarData ] = useState(false);
  

  const toggleAvatarDataShowHandler = ()=>{setDisplayAvatarDataVisible(p=>!p)};
  const toggleSearchAvatarHandler = ()=>{ 
    setDisplaySearchAvatarVisible(p=>!p);
  };

  const toggleCreateAvatarShowHandler = () =>{
    setShowCreateAvatar(p=>!p)
  };

  const updateImageSet = UseGetImageSet();
  const addDezziIdToAvatar = UseAddDezziIdToAvatar();
  const removeDezziIdFromAvatar = UseRemoveDezziIdfromAvatar();

  useEffect(()=>{
    if (saveAvatarData){
      updateAvatars();
      setSaveAvatarData(()=>false);
    }
    
    const y = avatarData.length;
    if (y>=5){
      setShowAddAvatar(()=>false);
    }else{
      setShowAddAvatar(()=>true);
    }
  },[saveAvatarData]);

  const addAvatar = () =>{
    setDisplaySearchAvatarVisible(()=>true);
  }

  const updateAvatarOrder = (items:AvatarDataType[])=>{
    setAvatarData(()=>items);
    setSaveAvatarData(()=>true);
  }

  const updateAvatars =() =>{
    let data = { avatars : avatarData};
    updateImageSet(props.docId, data);
  }

  const selectUpdateAvatarData = (id:number)=>{
    const obj = avatarData.find(o=>o.id=== id);
    setAvatarItem(()=>obj);
    toggleAvatarDataShowHandler();
  }

  const deleteAvatarData = (id:number)=>{

    const _avatarData = avatarData.filter(data=> data.id !==id)
    setAvatarData(()=>_avatarData);
    /**
     * find the selected docid of the avatar from the id
     */
    const _selectedAvatarData = avatarData.filter(data=> data.id ==id);
    removeDezziIdFromAvatar(_selectedAvatarData[0].docId ,props.docId);

    /**
     * Tell the useEffect to now save the data to the imagedezziset table
     */
    setSaveAvatarData(()=>true);

    
  }

  const updateAvatarData = (description:string)=>{
    const id = avatarItem?.id;
    setAvatarData((avatarData.map(data=>{
      if(data.id === id){
        return {...data, description:description}
      }else{
        return {...data}
      }
    })));
    setSaveAvatarData(()=>true);
  }

  function getAvatarID(){
    const len = avatarData.length;
    let _id=1;
    for (let index = 0; index < len; index++) {
      const obj = avatarData.find(o=>o.id=== _id);
      if (obj){
        _id++
      }
    }
    return _id;
  }

  function selectAvatarWithId(docId:string,data:AvatarSetDataType){
    /**
     * this function will set the DezziId of what to work on based on what the
     * use has selected from any of the image Dezzi Cards. The useEffect
     * is listening to any of the changes of this value and will update the screens to show
     */
    let _selectedAvatar:AvatarDataType;
    const _id= getAvatarID();
    const _avatarData = avatarData;
    _selectedAvatar = {id:_id,description:data.description,faceUrl:data.faceUrl,url:data.url,docId:docId}
    _avatarData.push(_selectedAvatar);
    setAvatarData(()=>_avatarData);

    /**
     * add the DezziId to the avatar table
     */
    addDezziIdToAvatar(docId,props.docId)
    
    setSaveAvatarData(()=>true);
    setDisplaySearchAvatarVisible(()=>false);

  }

  function createNewAvatarSet(){
    /**
     * this occurs when the user was in the search avatar and click on the new button
     * Prepare the system for the creation of an avatar
     */
    setDisplaySearchAvatarVisible(()=>false);
    setShowCreateAvatar(()=>true);
  }

  function newAvatarReadyToUseForDezzieSet(docId:string,data:AvatarSetDataType){
    if (docId==""){
      setShowCreateAvatar(()=>false);
      return;
    }
    
    let _selectedAvatar:AvatarDataType;
    const _id= getAvatarID();
    const _avatarData = avatarData;
    _selectedAvatar = {id:_id,description:data.description,faceUrl:data.faceUrl,url:data.url,docId:docId}
    _avatarData.push(_selectedAvatar);

    /**
     * This will then save the dezziID to the avatar file
     */
    addDezziIdToAvatar(docId,props.docId);

    setAvatarData(()=>_avatarData);
    setSaveAvatarData(()=>true);

    /**
     * close the windows
     */
    
    setShowCreateAvatar(()=>false);
    setShowAddAvatar(()=>false);
    setDisplaySearchAvatarVisible(()=>false);
    
  }
  
  return (
    <div className="bg-gray-800 mt-4 p-6 rounded-md text-gray-200 ">
      <div className="flex flex-rows gap-4 mb-3">
        <h2 className="">Avatars</h2>
        { showAddAvatar &&
          <>
            <button
              onClick={addAvatar}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Find
            </button>
            <SearchForAvatar show={displaySearchAvatarVisible} toggleShow={toggleSearchAvatarHandler} selectAvatarWithId={selectAvatarWithId} createNewAvatarSet={createNewAvatarSet}/> 
            <CreateAvatar show={showCreateAvatar} toggleShow={toggleCreateAvatarShowHandler} useAvatarData={newAvatarReadyToUseForDezzieSet}/>    
          </>
        }
        
      </div>
      {avatarData !== undefined &&
          <>
          <SortableList 
            items={avatarData} 
            onChange={(e)=>updateAvatarOrder(e)}
            renderItem={item=>{
              return <>
                <SortableList.Item id={item.id}>
                  <div className="grid grid-cols-2">
                    <div>
                      <img src={item.faceUrl} alt="face image of avatar" className="rounded-md w-16"/>
                    </div>
                    <div className="grid grid-rows-2 gap-2 ml-3">
                      <button
                        value={item.id}
                        type="button"
                        className="rounded-full bg-cyan-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={(e)=>{
                          let id= parseInt(e.currentTarget.value);
                          selectUpdateAvatarData(id)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        value={item.id}
                        type="button"
                        className="rounded-full bg-orange-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={(e)=>{
                          let id= parseInt(e.currentTarget.value);
                          deleteAvatarData(id)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    
                  </div>
                  

                  <SortableList.DragHandle />
                </SortableList.Item>
              </>
            }}
          />
        {avatarItem !== undefined &&
          <UpdateAvatarData show={displayAvatarDataVisible} toggleShow={toggleAvatarDataShowHandler} data={avatarItem} onUpdate={updateAvatarData} />
        }
        
        
      
        
        </>
      }
    </div>
  );

}