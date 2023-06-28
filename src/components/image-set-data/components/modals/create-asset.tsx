"use client";
import React, { Fragment,useState,useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUploadButton from "@/components/ui/file-upload-button";



interface ChildProps {
  show: boolean;
  toggleShow: any;
  useAssetData: (description:string,canvasSize:string,fileToUpload:File|undefined)=>void;
}


function CreateAsset(props:ChildProps){ 
  const { show, toggleShow} = props;
  const [ assetFile,setAssetFile] = useState<File | undefined>(undefined);
  const [ errorMessage, setErrorMessage ]= useState("");
  const [description, setDescription] = useState("Post");
  const [canvas, setCanvas] = useState("1200x1200");

  
  useEffect(()=>{
    /**
     * this will reset this page to default when this modal is opened
     */
    if (props.show){
      setAssetFile(()=>undefined);
      setDescription(()=>"Post");
      setCanvas(()=>"1200x1200");
      setErrorMessage(()=>"");
    }
   
  },[props.show])

    

  async function createAssetData(){
    /**
     * this occurs when the new avatar data has been saved
     */
    if (assetFile===undefined){
      setErrorMessage(()=>"Missing Image File");
      return;
    }else{
      setErrorMessage(()=>"");
    }   
    props.useAssetData(description,canvas,assetFile);
  }

  

  
  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog static as="div" className="relative" onClose={()=> null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-[1000] bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[1001] overflow-y-auto">
            <div className="flex max-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-600 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full max-w-lg mx-4 sm:p-2">
                  <div className="flex flex-col gap-4">
                    <section>
                      <label htmlFor="description" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
                        Graphic Type
                      </label>
                      <select
                        name="description"
                        value={description}
                        className="block w-full rounded-md border-0 py-1 pl-3 pr-3 bg-gray-600 text-gray-200 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e)=>setDescription(e.currentTarget.value)}
                        >
                        <option>Post</option>
                        <option>Mobile, Desktop Ad</option>
                        <option>Mobile, Skyscraper</option>
                      </select>
                    </section>
                    <section>
                      <label htmlFor="canvas" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
                        Canvas Size
                      </label>
                      <select
                        name="canvas"
                        value={canvas}
                        className="block w-full rounded-md border-0 py-1 pl-3 pr-3 bg-gray-600 text-gray-200 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e)=>setCanvas(e.currentTarget.value)}
                        >
                        <option>1200x1200</option>
                        <option>300x250</option>
                      </select>
                    </section>

                    
                    <section className="bg-gray-700 p-4 rounded-md">
                      <FileUploadButton fileToUpload={setAssetFile}/>
                    </section>
                    
                    {errorMessage!="" &&
                      <h2 className="text-red-500">{errorMessage}</h2>
                    }
                    
                
                    <section className="flex flex-row justify-center gap-4 mb-4">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-cyan-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:w-auto"
                        onClick={() => createAssetData()}
                        >
                          Continue
                      </button>
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                        onClick={() => toggleShow()}
                      >
                        Cancel
                      </button>
                    </section>
                    
                  </div>
                

                </Dialog.Panel>
                </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default CreateAsset;