"use client";
import React, { Fragment,useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import {
  DocumentDuplicateIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import SmallDarkLogo from "../logo/darksmalllogo";

const navigation = [
  { name: 'Dezzi sets', href: '#', icon: DocumentDuplicateIcon, current: true },
  { name: 'Avatars', href: '#', icon: UsersIcon, current: false },
  
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface ChildProps {
  sidebarOpen: boolean;
  setSidebarOpen: any;
  menuClickHandler: (pref:string) => void;
}




export default function SidePanel(props:ChildProps){ 
  const {sidebarOpen, setSidebarOpen} = props;
  const [navList, setNavList] = useState(navigation);


  const setActiveState =(itemName:  string) =>{
    /// This will set the highlight color or active flag on the top menu selection object
    let current: boolean;
    setNavList(
      navList.map((item)=>{
        if (item.name===itemName){
          current=true;
          return {...item,current};
        }else{
          current=false;
          return {...item,current};
        }
      })
    )
  }
  

  return (
    <>
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <SmallDarkLogo />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <div className="-mx-2 space-y-1">
                        {navList.map((item) => (
                          <button
                            key={item.name}
                            onClick={(e)=>{
                              setActiveState(item.name);
                              props.menuClickHandler(item.name);
                            }}
                            className={classNames(
                              item.current
                                ? 'bg-indigo-700 text-white'
                                : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                'h-6 w-6 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    {/* Static sidebar for desktop */}
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-48 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <SmallDarkLogo />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <div className="-mx-2 space-y-1">
                {navList.map((item) => (
                  <button
                    key={item.name}
                    onClick={(e)=>{
                      setActiveState(item.name);
                      props.menuClickHandler(item.name);
                    }}
                    className={classNames(
                      item.current
                        ? 'bg-indigo-700 text-white'
                        : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </>
  )
}