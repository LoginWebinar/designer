"use client";
import {useState, useEffect } from "react";
import { SortableList } from "../../../sortable-list/sortable-list";
import { VerticalSortableList } from "../../../sortable-list/vertical-sortable-list";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { ThumbnailDataType } from "@/components/types/thumbnail-data-type";
import { ImageAssetDataType } from "@/components/types/image-asset-data-type";
import { ImageAssetLayerDataType } from "@/components/types/image-asset-layer-data-type";

import CanvasDropDown from "./canvas-drop-down";
import TextLayerDataFields from "./text-layer-data-fields";
import AssetLayerDataFields from "./asset-layer-data-fields";
import AvatarLayerDataFields from "./avatar-layer-data-fields";
import LogoLayerDataFields from "./logo-layer-data-fields";
import DescriptionDropDown from "@/components/image-set-data/components/ui/description-drop-down";
import CreateAssetLayer from "../modals/create-asset-layer";
import FileUploadButton from "@/components/ui/file-upload-button";
import CreateAsset from "../modals/create-asset";

import UseGetImageSet from "../hooks/use-update-imageset";
import UseGetDezziAsset from "../hooks/use-get-dezzi-asset";
import UseUpdateImageSetAssetLayer from "../hooks/use-update-imageset-asset-layer";
import UseAddAssetToImageset from "../hooks/use-add-asset-to-imageset";

import { storage } from "@/components/utils/firebase-app";
import { uploadBytes,getDownloadURL,ref } from "firebase/storage";
import { nanoid } from "nanoid";


interface ChildProps {
  data:ThumbnailDataType[];
  docId:string,
}


export default function AssetLevelData(props:ChildProps){
  const [ thumbnailData, setThumbnailData]=useState<ThumbnailDataType[]>(props.data);
  const [ showAssetLayerModal, setShowAssetLayerModal ] = useState(false);
  const [ showAssetModal, setShowAssetModal ] = useState(false);
  const [ saveThumbnailData, setSaveThumbnailData ] = useState(false);
  const [ saveLayersData, setSaveLayersData ] = useState(false);
  const [ saveAssetCanvasData, setSaveAssetCanvasData ] = useState(false);
  const [ displayThumbnailUI, setDisplayThumbnailUI] = useState(false);
  const [ displayLayerUI, setDisplayLayerUI] = useState(false);
  const [ displayDuplicateUI, setDisplayDuplicateUI] = useState(false);
  const [ displayDeleteUI, setDisplayDeleteUI] = useState(false);
  const [ selectedThumbnailData, setSelectedThumbnailData ] = useState<ThumbnailDataType>();
  const [ selectedAssetDocId, setSelectedAssetDocId ] = useState("");
  const [ selectedAssetData, setSelectedAssetData ] = useState<ImageAssetDataType>();
  const [ selectedAssetLayers, setSelectedAssetLayers ] = useState<ImageAssetLayerDataType[]>();
  

  const updateImageSet = UseGetImageSet();
  const getDezziAsset = UseGetDezziAsset();
  const updateImageSetAssetLayer = UseUpdateImageSetAssetLayer();
  const addAssetToImageset = UseAddAssetToImageset();

  const closeAssetLayerModal = () =>{
    setShowAssetLayerModal(()=>false);
  }

  const closeAssetModal = () =>{
    setShowAssetModal(()=>false);
  }


  useEffect(()=>{
    /**
     * this will save the Thumbnail data to the table
     * just set the setSaveThumbnailData to true
     */
    const saveThumbnailToFirestore = async ()=>{
      let data = { thumbnails : thumbnailData};
      await updateImageSet(props.docId, data);
      setSaveThumbnailData(()=>false);
    }

    if (saveThumbnailData){
      saveThumbnailToFirestore().catch(console.error);
    }
  },[saveThumbnailData]);

  useEffect(()=>{
    /**
     * this will save the Layers in the dezziDocid and the assets docid
     * set the setSaveLayersData = true after updated the selectedAssetLayers
     * in a function
     */
    const saveLayersToFirestore = async () =>{
      let data = { layers : selectedAssetLayers};
      await updateImageSetAssetLayer(props.docId,selectedAssetDocId,data);
      setSaveLayersData(()=>false);
    }

    if (saveLayersData){
      saveLayersToFirestore().catch(console.error);
    }

  },[saveLayersData]);

  useEffect(()=>{
    /**
     * this will save the Layers in the dezziDocid and the assets docid
     * set the setSaveLayersData = true after updated the selectedAssetLayers
     * in a function
     */
    const saveCanvasToFirestore = async () =>{
      let data = { canvasSize : selectedAssetData?.canvasSize};
      await updateImageSetAssetLayer(props.docId,selectedAssetDocId,data);
      setSaveAssetCanvasData(()=>false);
    }

    if (saveAssetCanvasData){
      saveCanvasToFirestore().catch(console.error);
    }

  },[saveAssetCanvasData]);


  const addAsset = () =>{
    /**
     * This will open the Asset Data Model when the user requests to 
     * start creating a new Asset
     */
    setDisplayDeleteUI(()=>false);
    setDisplayDuplicateUI(()=>false);
    setDisplayLayerUI(()=>false);
    setDisplayThumbnailUI(()=>false);
    setSelectedAssetDocId(()=>"");
    setSelectedAssetData(()=>undefined);
    setSelectedAssetLayers(()=>undefined);
    setShowAssetModal(()=>true);

  }

  const getAssetLayerData = async (assetDocId:string)=>{
    /**
     * this function by passing in the AsssetDocId of the dezzi will return the
     * selected layers and put them in state to use
     */
    const assetLayers = await getDezziAsset(props.docId,assetDocId);
    setSelectedAssetData(()=>assetLayers);
    setSelectedAssetLayers(()=>assetLayers!.layers);
  
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
    setDisplayThumbnailUI(()=>false);
    if (obj){
      setSelectedAssetDocId(()=>obj.assetDocId);
      getAssetLayerData(obj.assetDocId);
      setSelectedThumbnailData(()=>obj);
      setDisplayDuplicateUI(()=>false);
      setDisplayDeleteUI(()=>false);
      setDisplayLayerUI(()=>false);
      setDisplayThumbnailUI(()=>true);
    }
    
  }

  const duplicateAssetData = (id:number)=>{
    /**
     * this occurs when the user starts to the request to make a duplicate
     * this will place values in the state, but not make a copy
     * that will occur when the user confirms to duplicate
     */
    const obj = thumbnailData.find(o=>o.id=== id);
    
    if (obj){
      setSelectedAssetDocId(()=>obj.assetDocId);
      setSelectedThumbnailData(()=>obj);
      getAssetLayerData(obj.assetDocId);
      setDisplayThumbnailUI(()=>false);
      setDisplayLayerUI(()=>false);
      setDisplayDuplicateUI(()=>true);
    }    
  }

  const layerAssetData= (id:number)=>{
    const obj = thumbnailData.find(o=>o.id=== id);
    setSelectedAssetLayers(()=>undefined);
    if (obj){
      setSelectedAssetDocId(()=>obj.assetDocId);
      setSelectedThumbnailData(()=>obj);
      getAssetLayerData(obj.assetDocId);
      setDisplayDuplicateUI(()=>false);
      setDisplayThumbnailUI(()=>false);
      setDisplayLayerUI(()=>true);  
    }
  }

  const deleteAssetLayerData= (id:number)=>{
    /**
     * This occurs when the user clicks on the delete button
     * to remove the layer. The layer should be deleted from the table
     * 
     */
    const _assetLayers = selectedAssetLayers!.filter(data=> data.id !==id);
    setSelectedAssetLayers(()=>_assetLayers);
    setSaveLayersData(()=>true);
  }

  const assetLayerDataById= (id:number)=>{
    /**
     * This returns the layer object back to the data levels
     * 
     */
    const obj = selectedAssetLayers?.find(o=>o.id=== id);
    return obj;
  }

  

  const addAssetLayer = ()=>{
    /**
     * occurs when a user clicks on Add a layer in the assets collection
     */
    
    setShowAssetLayerModal(()=>true);

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

  const startDuplicateProcess = async()=>{
    /**
     * this is the confirmation of the duplication process
     * the item to duplicate has already been put into state
     * now we need to duplicate that state and add the information
     * into the table. We do not copy any of the files as the viewer 
     * may upload new files or they may upload just a single file, all this process will
     * do is to create a copy of the asset collection and copy the thumbnail array based
     * on the assetDocId
     */
    
    
    const _duplicateData = selectedAssetData as unknown;
    const duplicateData = _duplicateData as ImageAssetDataType;
    
    const newDocId = await addAssetToImageset(props.docId,selectedAssetDocId,duplicateData);

    /**
     * now we need to update the Thumbnail data
     */
    const layerId = returnNextThumbnailID();
    let obj = thumbnailData.find(o=>o.assetDocId=== selectedAssetDocId);
    if (newDocId!=undefined && obj){
      obj = {...obj,assetDocId:newDocId,id:layerId}
      let _thumbnailData = thumbnailData;
      _thumbnailData.push(obj);
      setThumbnailData(()=>_thumbnailData);
      setSaveThumbnailData(()=>true);
    }
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

  

  function updateThumbnailOrder(items:ThumbnailDataType[]){
    setThumbnailData(()=>items);
    setSaveThumbnailData(()=>true);
  }


  function updateAssetLayerOrder(items:ImageAssetLayerDataType[]){
    setSelectedAssetLayers(()=>items);
    setSaveLayersData(()=>true);
  }

  function avatarLayerBlur(value:string,id:number|undefined,key:string){
    let _updateData = selectedAssetLayers!.map(data=>{
      if(data.id==id){
        switch (key){
          case "height":
            return {...data,height:parseInt(value)}
          case "xposition":
            return {...data,xPosition:parseInt(value)}
          case "yposition":
            return {...data,yPosition:parseInt(value)}
        }
        
      }else{
        return {...data}
      }
    }) as unknown;
    let updateData = _updateData as ImageAssetLayerDataType[];
    setSelectedAssetLayers(()=>updateData);
    setSaveLayersData(()=>true);
  }

  function logoLayerBlur(value:string,id:number|undefined,key:string){
    let _updateData = selectedAssetLayers!.map(data=>{
      if(data.id==id){
        switch (key){
          case "height":
            return {...data,height:parseInt(value)}
          case "xposition":
            return {...data,xPosition:parseInt(value)}
          case "yposition":
            return {...data,yPosition:parseInt(value)}
        }
        
      }else{
        return {...data}
      }
    }) as unknown;
    let updateData = _updateData as ImageAssetLayerDataType[];
    setSelectedAssetLayers(()=>updateData);
    setSaveLayersData(()=>true);
  }

  function textLayerBlur(value:string,id:number|undefined,key:string){
    
    let _updateData = selectedAssetLayers!.map(data=>{
      if(data.id==id){
        switch (key){
          case "linenumber":
            return {...data,line:value};
          case "emphasis":
            return {...data,fontEmphasis:value};
          case "fontfamily":
            return {...data,fontFamily:value};
          case "align":
            return {...data,textAlign:value};
          case "color":
            value=value.replace(/\s+/g,'');
            return {...data,textColor: value};
          case "fontsize":
            return {...data,fontSize: value};
          case "height":
            return {...data,height:parseInt(value)};
          case "xposition":
            return {...data,xPosition:parseInt(value)};
          case "yposition":
            return {...data,yPosition:parseInt(value)};
        }
        
      }else{
        return {...data}
      }
    }) as unknown;
    let updateData = _updateData as ImageAssetLayerDataType[];
    setSelectedAssetLayers(()=>updateData);
    setSaveLayersData(()=>true);
  }

  function thumbnailDescriptionBlur(value:string,id:number|undefined){
    /**
     * this function will accept the results of the description of graphic as a dropdown
     * after you tab off the field and save the description back to the table
     */
    let _updateData = thumbnailData!.map(data=>{
      if(data.id==id){
        return {...data,description:value}        
      }else{
        return {...data}
      }
    }) as unknown;
    let updateData = _updateData as ThumbnailDataType[];
    setThumbnailData(()=>updateData);
    setSaveThumbnailData(()=>true);

  }

  function thumbnailCanvasBlur(value:string,id:number|undefined){
    /**
     * this function will accept the results of the description of graphic as a dropdown
     * after you tab off the field and save the description back to the table
     */
    let _updateData = thumbnailData!.map(data=>{
      if(data.id==id){
        return {...data,size:value}        
      }else{
        return {...data}
      }
    }) as unknown;
    const updateThumbnailData = _updateData as ThumbnailDataType[];
    const updateSelectedValue = {...selectedThumbnailData,size:value} as ThumbnailDataType;

    setSelectedThumbnailData(()=>updateSelectedValue);
    setThumbnailData(()=>updateThumbnailData);

    /**
     * update the Assets CanvasSize value
     */
    const updateSelectedAssetValue = {...selectedAssetData, canvasSize: value} as ImageAssetDataType;
    setSelectedAssetData(()=>updateSelectedAssetValue);

    /**
     * tell the system to now save this data
     */
    setSaveThumbnailData(()=>true);
    setSaveAssetCanvasData(()=>true);

  }

  function returnNextAssetLayerID(){
    const len = selectedAssetLayers!.length;
    let _id=1;
    for (let index = 0; index < len; index++) {
      const obj = selectedAssetLayers!.find(o=>o.id=== _id);
      if (obj){
        _id++
      }
    }
    return _id;
  }

 
  function returnNextThumbnailID(){
    const len = thumbnailData!.length;
    let _id=1;
    for (let index = 0; index < len; index++) {
      const obj = thumbnailData!.find(o=>o.id=== _id);
      if (obj){
        _id++
      }
    }
    return _id;
  }

  async function createAssetData(description:string,canvasSize:string,assetFile:File|undefined){
    /**
     * This runs after the viewer selects what type of asset to create. This function will
     * save the information to the table.
     */
    const blankData={canvasSize:canvasSize,layers:[]} as ImageAssetDataType;
    const newDocId = await addAssetToImageset(props.docId,selectedAssetDocId,blankData);

    /**
     * now we need to update the Thumbnail data
     */
    const layerId = returnNextThumbnailID();
    
    /**
     * the file needs to get uploaded and get the URL
     */
    if (assetFile!=undefined){
      const uniqueId = nanoid();
      const fileName = assetFile.name;
      const uploadedFileName = uniqueId+"_"+fileName;
      const fullFileLocationAndName = "/protected/images/"+props.docId+"/thumbnails/"+uploadedFileName;
      const fileRef = ref(storage,fullFileLocationAndName);
  
      uploadBytes(fileRef, assetFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async(url) => {
          const obj= {id:layerId,description:description,size:canvasSize,url:url,assetDocId:newDocId} as ThumbnailDataType;
          let _thumbnailData = thumbnailData;
          _thumbnailData.push(obj);
          setThumbnailData(()=>_thumbnailData);
          setSaveThumbnailData(()=>true);
          setShowAssetModal(()=>false);
        });
      });
    }else{
      /**
      * close the asset modal
      */
      setShowAssetModal(()=>false);
    }
     
  }

  function createAssetLayerData(assetType:string,assetFile:File|undefined ){
    
    const layerId = returnNextAssetLayerID();
    let item:ImageAssetLayerDataType = {
      id:layerId,
      type:assetType,
    }

    let _assetLayers = selectedAssetLayers as unknown;
    let assetLayers = _assetLayers as ImageAssetLayerDataType[];
    
    if (assetFile!=undefined){
      const uniqueId = nanoid();
      const fileName = assetFile.name;
      const uploadedFileName = uniqueId+"_"+fileName;
      const fullFileLocationAndName = "/protected/images/"+props.docId+"/images/"+selectedAssetDocId+"/"+uploadedFileName;
      const fileRef = ref(storage,fullFileLocationAndName);
  
      uploadBytes(fileRef, assetFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async(url) => {
          item={...item,url:url};
          assetLayers.push(item);
          setSelectedAssetLayers(()=>assetLayers);

          setSaveLayersData(()=>true);
          setShowAssetLayerModal(()=>false);
        });
      });
    }else{
      switch (assetType){
        case "text":
          item={...item,xPosition:0,yPosition:0,fontSize:"12px",fontFamily:"arial",line:"",textAlign:"left",textColor:"#000000"}
          break;
        default:
          item={...item,height:0,xPosition:0,yPosition:0}
      }
          
      assetLayers.push(item);
      setSelectedAssetLayers(()=>assetLayers);
  
      setSaveLayersData(()=>true);
      setShowAssetLayerModal(()=>false);
    }
    

  }


  function newThumbnailFile(uploadedFile:File|undefined){
    const uniqueId = nanoid();
    const fileName = uploadedFile!.name;
    const uploadedFileName = uniqueId+"_"+fileName;
    const fullFileLocationAndName = "/protected/images/"+props.docId+"/images/"+selectedAssetDocId+"/"+uploadedFileName;
    const fileRef = ref(storage,fullFileLocationAndName);
    uploadBytes(fileRef, uploadedFile!).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async(url) => {
        
        let _updateData = thumbnailData!.map(data=>{
          if(data.assetDocId==selectedAssetDocId){
            return {...data,url:url}        
          }else{
            return {...data}
          }
        }) as unknown;
        const updateThumbnailData = _updateData as ThumbnailDataType[];
        const updateSelectedValue = {...selectedThumbnailData,url:url} as ThumbnailDataType;

        setSelectedThumbnailData(()=>updateSelectedValue);
        setThumbnailData(()=>updateThumbnailData);
        setDisplayThumbnailUI(()=>false);
      });
    });
    

  }

  return (
    <>
    <CreateAsset show={showAssetModal} toggleShow={closeAssetModal} useAssetData={createAssetData}/>
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
                            General
                          </button>
                          <button
                            value={item.id}
                            type="button"
                            className="rounded-full bg-cyan-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e)=>{
                              let id= parseInt(e.currentTarget.value);
                              layerAssetData(id);
                            }}
                          >
                            Layers
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
            <>
              
              
              <div className="flex justify-center flex-col md:flex-row gap-4 border border-indigo-500 rounded-md p-2">
                <img src={selectedThumbnailData?.url} alt="asset thumbnail" className="rounded-md h-full w-32"/>
                <div>
                  <DescriptionDropDown thumbnailData={selectedThumbnailData} onBlur={thumbnailDescriptionBlur}/>
                  <div className="mt-4"></div>
                  <CanvasDropDown thumbnailData={selectedThumbnailData} onBlur={thumbnailCanvasBlur} />
                 
                    
                </div>
                <section className="bg-gray-700 p-4 rounded-md">
                  <label className="block text-xs px-1.5 font-medium text-gray-200 mb-1" >Replace Thumbnail</label>
                  <FileUploadButton fileToUpload={newThumbnailFile}/>
                </section>

              </div>
            </>
          }
          { displayLayerUI &&
            <>
            <CreateAssetLayer show={showAssetLayerModal} toggleShow={closeAssetLayerModal} useLayerData={createAssetLayerData} />
            <div className="flex flex-col md:flex-row gap-4 border border-indigo-500 rounded-md p-2">
              <div className="grow mb-2 md:ml-4">
                  <div className="flex flex-row gap-4 mb-2">
                    <h3 className="text-sm">Layers</h3>
                    <button
                      onClick={addAssetLayer}
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
                                  { item.type=="text" && <TextLayerDataFields assetData={assetLayerDataById(item.id)} onBlur={textLayerBlur}  /> }
                                  { item.type=="asset" && <AssetLayerDataFields assetData={assetLayerDataById(item.id)} /> }
                                  { item.type=="avatar" && <AvatarLayerDataFields assetData={assetLayerDataById(item.id)} onBlur={avatarLayerBlur} />}
                                  { item.type=="logo" && <LogoLayerDataFields assetData={assetLayerDataById(item.id)} onBlur={logoLayerBlur} />}
                                  
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
            </>
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