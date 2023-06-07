"use client";
import React, { Fragment,useEffect,useState } from "react";
import { useGlobalContext } from "../../components/contexts/user-global-context";
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {auth} from "../../components/utils/firebase-app";


interface ChildProps {
  sidebarOpen: boolean;
  setSidebarOpen: any;
  
}


export default function NavBar(props:ChildProps){ 
  const {sidebarOpen, setSidebarOpen} = props;
  const { userData } = useGlobalContext();
  const [userPhotoURL,setUserPhotoURL]= useState("");
  const [useUserPhoto,setUseUserPhoto] = useState(false);
  const [userDisplayName,setUserDisplayName] = useState("");
  
  

  useEffect(()=>{
    /**
     * If the user clicks the page refresh, the first time the userdata will be 0 objects
     */
    if (userData.length!=0){
      if (userData[0].photoURL!=undefined){
        setUseUserPhoto(true);
        setUserPhotoURL(userData[0].photoURL);
      }
      if (userData[0].displayName!=undefined){
        setUserDisplayName(userData[0].displayName);
      }
    }
  },[userData]);


async function handleOnClickLogout(){
  /**
   * this will turn off the showpage and set the logout the user
   * and kill the userdata, This is found in the navbar menu
   * the user useEffect will then change the url of the page
   * back to the login page
   */
  await auth.signOut();
}


  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-700 bg-chocolate-400 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="relative flex flex-1"></div>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                { useUserPhoto ? <img referrerPolicy="no-referrer" className="h-8 w-8 rounded-full" src={userPhotoURL} alt="" /> : <UserCircleIcon className="h-8 w-8 dark:text-gray-900" /> }
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-4 text-sm font-semibold leading-6 text-gray-200" aria-hidden="true">
                    <div className="text-base font-medium">{userDisplayName}</div>
                  </span>
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    <button onClick={handleOnClickLogout} className="block px-4 py-2 text-base font-medium  hover:text-gray-100 dark:hover:bg-gray-100 hover:text-gray-800">Sign out</button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}