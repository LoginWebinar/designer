"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../components/contexts/user-global-context";
import { useRouter } from "next/navigation";

import SidePanel from "@/components/side-panel/side-panel";
import NavBar from "@/components/navbar/navbar";
import AlgoliaDezzieSetSearch from "../../../components/algolia-dezzieset-search/algolia-dezzieset-search";
import ImageSetData from "@/components/image-set-data/image-set-data";

import { ImageSetDataType } from "../../../components/types/image-set-data-type";


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


export default function DashboardPage(){ 
  const { user } = useGlobalContext();
  const [ sidebarOpen, setSidebarOpen] = useState(false);
  const [ showDezziSets, setShowDezziSets ] = useState(true);
  const [ showAvatars, setShowAvatars ] = useState(false);
  const [ showDezziSetData, setShowDezziSetData] = useState(false);
  const [ imageSetDataToEdit, setImageSetDataToEdit] = useState<ImageSetDataType|null>(null);
  const [ imageSetDataDocId, setImageSetDataDocId] = useState("");

  const router = useRouter();

  useEffect(()=>{
    if(user===null){
      /**
       * the user has been logged out of the system most likely by opening a 
       * seperate tab and logged themselves out that way
       */
      router.push("/");
    }
  },[user])

  const getMenuSelectedAction = (pref: string) => {
    setShowDezziSetData(()=>false);
    switch (pref){
      case "Avatars":
        setShowAvatars(()=>true);
        setShowDezziSets(()=>false);
        break;
      default:
        setShowAvatars(()=>false);
        setShowDezziSets(()=>true);
        break;
    }
  };

  function editImageDezziWithId(docId:string,data:ImageSetDataType){
    /**
     * this function will set the DezziId of what to work on based on what the
     * use has selected from any of the image Dezzi Cards. The useEffect
     * is listening to any of the changes of this value and will update the screens to show
     */
    setImageSetDataToEdit(()=>data);
    setImageSetDataDocId(()=>docId);
    setShowDezziSetData(()=>true);
    setShowAvatars(()=>false);
    setShowDezziSets(()=>false);
  }

  function createNewDezzieSet(){
    /**
     * This function will allow a new image dezzie set to be created
     */
    setImageSetDataToEdit(()=>null);
    setImageSetDataDocId(()=>"");
    setShowDezziSetData(()=>true);
    setShowAvatars(()=>false);
    setShowDezziSets(()=>false);
  }

  return(
    <>
    <div>
      <SidePanel sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} menuClickHandler={getMenuSelectedAction}/>
      <div className="lg:pl-48">
        <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            { showDezziSets &&
              <AlgoliaDezzieSetSearch selectedImage={editImageDezziWithId} createNewImage={createNewDezzieSet}/>
            }
            { showDezziSetData && 
              <ImageSetData imageSetDataToEdit={imageSetDataToEdit} docId={imageSetDataDocId}/>
            }
            { showAvatars &&
              <p className="text-white">Avatars</p>
            }
            
          </div>
        </main>
      </div>
    </div>
    </>
  )
}
