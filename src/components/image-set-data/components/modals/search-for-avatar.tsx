"use client";
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserIcon} from "@heroicons/react/24/outline";


import AlgoliaAvatarSetSearch from "@/components/algolia-avatarset-search/algolia-avatarset-search";
import { AvatarSetDataType } from "@/components/types/avatar-set-data-type";
import { AvatarDataType } from "@/components/types/avatar-data-type";


/**
 * Created by: Rob Helmstetter
 * Date: 4/04/23
 * 
 * The component is a modal window that appears to allow the user
 * to edit their firstName and lastName. This is called from the
 * features/user/user-profile component. The data entered
 * _firstName & _lastName are sent to the update hook
 * for processing.
 * 
 * Updates:
 * 
*/ 


interface ChildProps {
    show: boolean;
    toggleShow: any;
    selectAvatarWithId:any;
    createNewAvatarSet:any;
}

 
function SearchForAvatar(props:ChildProps){ 
    const {show, toggleShow} = props
 
    

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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-500 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full mx-10  sm:p-6">

                    <AlgoliaAvatarSetSearch selectedImage={props.selectAvatarWithId} createNewImage={props.createNewAvatarSet} actionWord="Select"/>

                    <div className="mt-5 sm:mt-6 flex justify-end">
                        <button
                            type="button"
                            className="inline-flex rounded-md bg-red-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto md:ml-4"
                            onClick={() => toggleShow()}
                        >
                            Cancel
                        </button>
                    
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

export default SearchForAvatar;