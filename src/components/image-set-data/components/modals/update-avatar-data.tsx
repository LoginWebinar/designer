"use client";
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserIcon} from "@heroicons/react/24/outline";
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
    data:AvatarDataType;
    onUpdate:(value:string)=>void;
}

 
function UpdateAvatarData(props:ChildProps){ 
    const {show, toggleShow} = props
    const refAvatarDescription = useRef<HTMLTextAreaElement>(null);
    

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
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-500 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <UserIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-200">
                                Avatar Information
                                </Dialog.Title>
                            </div>
                            <div className="mt-3 isolate -space-y-px rounded-md shadow-sm">
                                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                                    <label htmlFor="description" className="block text-xs font-medium text-gray-200">
                                        Description of Avatar
                                    </label>
                                    <textarea
                                        rows={4}
                                        ref={refAvatarDescription}
                                        name="description"
                                        id="description"
                                        className="block w-full mb-2 border-0 p-0 text-gray-900 bg-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        defaultValue={props.data.description}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="mt-5 sm:mt-6 sm:flex">
                            
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={(e) => {
                                    toggleShow();
                                    const _updatedDescription = refAvatarDescription.current?.value as string;
                                    props.onUpdate(_updatedDescription);
                                }}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto md:ml-4"
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

export default UpdateAvatarData;