"use client";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AvatarNewData from "@/components/avatar-new-data/avatar-new-data";
import { AvatarSetDataType } from "@/components/types/avatar-set-data-type";

interface ChildProps {
  show: boolean;
  toggleShow: any;
  useAvatarData: (docid:string,data:AvatarSetDataType)=>void;
}


function CreateAvatar(props:ChildProps){ 
  const {show, toggleShow} = props;
  

  function createdAvatarData(docId:string,data:AvatarSetDataType){
    /**
     * this occurs when the new avatar data has been saved
     */
    props.useAvatarData(docId,data);

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-700 px-2 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full mx-4 sm:p-2">

                  <AvatarNewData toggleShow={props.toggleShow} createdAvatarData={createdAvatarData}/>

                </Dialog.Panel>
                </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default CreateAvatar;