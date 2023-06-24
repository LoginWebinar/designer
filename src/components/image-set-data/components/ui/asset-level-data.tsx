"use client";
import {useState, useEffect } from "react";
import { SortableList } from "../../../sortable-list/sortable-list";
import { VerticalSortableList } from "../../../sortable-list/vertical-sortable-list";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { ThumbnailDataType } from "@/components/types/thumbnail-data-type";
import { ImageAssetDataType } from "@/components/types/image-asset-data-type";
import { ImageAssetLayerDataType } from "@/components/types/image-asset-layer-data-type";

import CanvasDropDown from "../../../ui/canvas-drop-down";
import TextLayerDataFields from "./text-layer-data-fields";
import AssetLayerDataFields from "./asset-layer-data-fields";
import AvatarLayerDataFields from "./avatar-layer-data-fields";
import LogoLayerDataFields from "./logo-layer-data-fields";
import DescriptionDropDown from "@/components/ui/description-drop-down";

import UseGetImageSet from "../hooks/use-update-imageset";
import UseGetDezziAsset from "../hooks/use-get-dezzi-asset";

interface ChildProps {
  data:ThumbnailDataType[];
  docId:string,
}


export default function AssetLevelData(props:ChildProps){
  const [ thumbnailData, setThumbnailData]=useState<ThumbnailDataType[]>(props.data);
  const [ saveThumbnailData, setSaveThumbnailData ] = useState(false);
  const [ displayThumbnailUI, setDisplayThumbnailUI] = useState(false);
  const [ displayDuplicateUI, setDisplayDuplicateUI] = useState(false);
  const [ displayDeleteUI, setDisplayDeleteUI] = useState(false);
  const [ selectedThumbnailData, setSelectedThumbnailData ] = useState<ThumbnailDataType>();
  const [ selectedAssetDocId, setSelectedAssetDocId ] = useState<String>("");
  const [ selectedAssetData, setSelectedAssetData ] = useState<ImageAssetDataType>();
  const [ selectedAssetLayers, setSelectedAssetLayers ] = useState<ImageAssetLayerDataType[]>();

  const updateImageSet = UseGetImageSet();
  const getDezziAsset = UseGetDezziAsset();

  useEffect(()=>{
    if (saveThumbnailData){
      updateThumbnails();
      setSaveThumbnailData(()=>false);
    }
  },[saveThumbnailData]);

  const getAssetLayerData = async (assetDocId:string)=>{
    /**
     * this function by passing in the AsssetDocId of the dezzi will return the
     * selected layers and put them in state to use
     */
    const assetLayers = await getDezziAsset(props.docId,assetDocId);
    console.log("Layers",assetLayers);
    setSelectedAssetData(()=>assetLayers);
    setSelectedAssetLayers(()=>assetLayers?.layers);
  
  }

  const updateAssetLayerData = async(id:number) =>{
    /**
     * this function occurs when the user clicks on edit the layer
     * the layer cannot be change of its type. In order to change the layer type, the
     * user must delete and add new
     */
  }



  const updateAssetData = (id:number) =>{
    const obj = thumbnailData.find(o=>o.id=== id);
    if (obj){
      setSelectedAssetDocId(()=>obj.assetDocId);
      getAssetLayerData(obj.assetDocId);
      setSelectedThumbnailData(()=>obj);
      setDisplayDuplicateUI(()=>false);
      setDisplayDeleteUI(()=>false);
      setDisplayThumbnailUI(()=>true);
    }
    
  }

  const duplicateAssetData = (id:number)=>{
    const obj = thumbnailData.find(o=>o.id=== id);
    if (obj){
      setSelectedAssetDocId(()=>obj.assetDocId);
      setSelectedThumbnailData(()=>obj);
      setDisplayDeleteUI(()=>false);
      setDisplayThumbnailUI(()=>false);
      setDisplayDuplicateUI(()=>true);
    }    
  }

  const deleteAssetData= (id:number)=>{
    const obj = thumbnailData.find(o=>o.id=== id);
    if (obj){
      setSelectedAssetDocId(()=>obj.assetDocId);
      setSelectedThumbnailData(()=>obj);
      setDisplayDuplicateUI(()=>false);
      setDisplayThumbnailUI(()=>false);
      setDisplayDeleteUI(()=>true);
  
    }
  }

  const deleteAssetLayerData= (id:number)=>{
    /**
     * This occurs when the user clicks on the delete button
     * to remove the layer. The layer should be deleted from the table
     * 
     */
    const obj = selectedAssetLayers?.find(o=>o.id=== id);
    console.log("Start of Delete");
    if (obj){
      
  
    }
  }

  const assetLayerDataById= (id:number)=>{
    /**
     * This occurs when the user clicks on the delete button
     * to remove the layer. The layer should be deleted from the table
     * 
     */
    const obj = selectedAssetLayers?.find(o=>o.id=== id);
    return obj;
    // if (obj){
    //   return obj;  
    // }else{
    //   return undefined;
    // }
  }

  

  const addAsset= ()=>{

  }

  const cancelDuplicateProcess = ()=>{
    /**
     * this is the cancelation of the duplication process
     */
    setSelectedThumbnailData(()=>undefined);
    setSelectedAssetData(()=>undefined);
    setSelectedAssetLayers(()=>undefined);
    setSelectedAssetDocId(()=>"");
    setDisplayDuplicateUI(()=>false);
  }

  const startDuplicateProcess = ()=>{
    /**
     * this is the start of the duplication process
     */


    setDisplayDuplicateUI(()=>false);
  }


  const cancelDeleteProcess = ()=>{
    /**
     * this is the cancelation of the duplication process
     */
    setSelectedThumbnailData(()=>undefined);
    setSelectedAssetData(()=>undefined);
    setSelectedAssetLayers(()=>undefined);
    setSelectedAssetDocId(()=>"");
    setDisplayDeleteUI(()=>false);
  }

  const startDeleteProcess = ()=>{
    /**
     * this is the start of the duplication process
     */


    setDisplayDeleteUI(()=>false);
  }

  const updateThumbnails =() =>{
    let data = { thumbnails : thumbnailData};
    updateImageSet(props.docId, data);
  }


  function updateThumbnailOrder(items:ThumbnailDataType[]){
    setThumbnailData(()=>items);
    setSaveThumbnailData(()=>true);
  }


  function updateAssetLayerOrder(items:ImageAssetLayerDataType[]){
    setSelectedAssetLayers(()=>items);
    //setSaveThumbnailData(()=>true);
  }

  return (
    <>
    <div className="bg-gray-800 mt-4 p-6 rounded-md text-gray-200 ">
      <div className="flex flex-rows gap-4 mb-3">
        <h2 className="">Assets</h2>
          <button
            onClick={addAsset}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Add
          </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-initial md:max-w-sm">
        { thumbnailData!=undefined &&
        <>
          <SortableList 
              items={thumbnailData} 
              onChange={(e)=>updateThumbnailOrder(e)}
              renderItem={item=>{
                return <>
                  <SortableList.Item id={item.id}>
                    <div className="grid grid-cols-3 gap-2 max-w-[300px]">
                      <div>
                        <img src={item.url} alt="asset thumbnail" className="rounded-md w-32"/>
                      </div>
                      <div>
                        <p className="text-xs">{item.size}</p>
                        <p className="text-xs mt-2">{item.description}</p>
                      </div>
                    
                      
                        <div className="grid grid-rows-3 gap-2 ml-3">
                          <button
                            value={item.id}
                            type="button"
                            className="rounded-full bg-cyan-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e)=>{
                              let id= parseInt(e.currentTarget.value);
                              updateAssetData(id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            value={item.id}
                            type="button"
                            className="rounded-full bg-green-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e)=>{
                              let id= parseInt(e.currentTarget.value);
                              duplicateAssetData(id);
                            }}
                          >
                            Duplicate
                          </button>
                          <button
                            value={item.id}
                            type="button"
                            className="rounded-full bg-orange-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e)=>{
                              let id= parseInt(e.currentTarget.value);
                              deleteAssetData(id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        </div>
                    
                    <SortableList.DragHandle />
                  </SortableList.Item>
                </>
                }
              }
            />
        </>
        }
        </div>
        <div className="w-full">
          { displayThumbnailUI &&
              <div className="flex flex-col md:flex-row gap-4 border border-indigo-500 rounded-md p-2">
                <div>
                  <DescriptionDropDown />
                  <div className="mt-4"></div>
                  <CanvasDropDown />
                </div>
                <div className="grow mb-2 md:ml-4">
                  <div className="flex flex-row gap-4 mb-2">
                    <h3 className="text-sm">Layers</h3>
                    <button
                      onClick={addAsset}
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                      Add
                    </button>
                  </div>
                  <div className="mb-2">
                    
                  { selectedAssetLayers && 
                      <VerticalSortableList 
                        items={selectedAssetLayers} 
                        onChange={(e)=>updateAssetLayerOrder(e)}
                        renderItem={(item)=>{
                          return <>
                            <VerticalSortableList.Item id={item.id}>
                              <div className="flex flex-row gap-4">
                                <div>
                                  <p className="text-xs">ID: {item.id.toString()}</p>
                                  <p className="text-xs">Type: {item.type}</p>
                                  <button
                                    value={item.id}
                                    type="button"
                                    className="rounded-full bg-orange-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={(e)=>{
                                      let id= parseInt(e.currentTarget.value);
                                      deleteAssetLayerData(id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                                <div className="grow">
                                  { item.type=="text" && <TextLayerDataFields assetData={assetLayerDataById(item.id)} /> }
                                  { item.type=="asset" && <AssetLayerDataFields assetData={assetLayerDataById(item.id)} /> }
                                  { item.type=="avatar" && <AvatarLayerDataFields assetData={assetLayerDataById(item.id)} />}
                                  { item.type=="logo" && <LogoLayerDataFields assetData={assetLayerDataById(item.id)} />}
                                  
                                </div>
                              </div>
                              
                              <VerticalSortableList.DragHandle />
                            </VerticalSortableList.Item>
                          </>
                          }
                        }
                      />
                    }
      








                  </div>
                </div>
              </div>
          }
          { displayDuplicateUI &&
              <div className="flex justify-center gap-4 border border-indigo-500 rounded-md p-2">
                <img src={selectedThumbnailData?.url} alt="asset thumbnail" className="rounded-md w-32"/>
                <div className="grid grid-rows-2 justify-items-center">
                  <h3>Duplicate this Asset {selectedThumbnailData?.description} {selectedThumbnailData?.size}</h3>
                  <div>
                    <button
                      type="button"
                      className="rounded-full bg-cyan-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e)=>{startDuplicateProcess()}}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-red-600 ml-4 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e)=>{cancelDuplicateProcess()}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          }
          { displayDeleteUI &&
              <div className="flex flex-row justify-center gap-4 border border-indigo-500 rounded-md p-2">
                <img src={selectedThumbnailData?.url} alt="asset thumbnail" className="rounded-md w-32"/>
                <div className="grid grid-rows-2 justify-items-center">
                  <h3>Delete this Asset {selectedThumbnailData?.description} {selectedThumbnailData?.size}</h3>
                  <div>
                    <button
                      type="button"
                      className="rounded-full bg-cyan-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e)=>{startDeleteProcess()}}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-red-600 ml-4 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e)=>{cancelDeleteProcess()}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          }
          
        </div>
      </div>
    </div>
    </>
  )
}