import React, {useState} from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox,Hits,DynamicWidgets,RefinementList,Menu,Configure,useInstantSearch } from "react-instantsearch-hooks-web";
import AvatarSetCard from "../avatar-set-card/avatar-set-card";
import { AvatarSetDataType } from "../types/avatar-set-data-type";
// import UseGetImageSet from "../image-set-card/components/hooks/use-get-imageset";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const searchClient = algoliasearch("9UVNMIEHAV","2167b0e6a51f8fe71e703075073b52c4");

interface ChildProps {
  selectedImage: (docId:string,data:any) => void;
  createNewImage: ()=>void;
  actionWord:string,
}



export default function AlgoliaAvatarSetSearch(props:ChildProps){
  const [showResults, setShowResults] = useState(false);

  function EmptyQueryBoundary({ children, fallback }:{children:any,fallback:any}) {
    const { indexUiState } = useInstantSearch();
    if (!indexUiState.query) {
      setShowResults(()=>false);
      return fallback;
    }
    return children;
  }


  function NoResultsBoundary({ children, fallback }:{children:any,fallback:any}) {
    const { results } = useInstantSearch();
    if (results.hits.length === 0) {
      return fallback;
    }
    setShowResults(()=>true);
    return children;
  }

  const imageSelection = async(docId:string,data:AvatarSetDataType )=>{
    props.selectedImage(docId,data);
  }


  function Hit({ hit }:{hit:any}) {
    const _unknown =hit as unknown;
    const imageCardData = _unknown as AvatarSetDataType;
    return (
    <>
      <AvatarSetCard imageCardData={imageCardData} onClick={imageSelection} actionWord={props.actionWord} />
    </>
    );
  }

  

  return (
    <InstantSearch searchClient={searchClient} indexName="avatar_sets" >
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl mr-4">Avatar Search</h2>
            <button
              onClick={props.createNewImage}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New
            </button>
          </div>
          
         

          <SearchBox  
            placeholder="Search for Avatar"
            searchAsYouType={true}
            classNames={{
              root: 'p-3 shadow-sm w-full',
              form: 'relative',
              input: 'block w-full pl-9 pr-3 py-2 bg-white text-gray-900 border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
              submitIcon: 'absolute top-4 left-0 bottom-0 w-6',
              }}/>
         
        </div>
      </div>
      <div id="avatar-hits" className="w-full flex flex-row flex-wrap justify-center">
          <EmptyQueryBoundary fallback={""} >
            <NoResultsBoundary fallback={"No results"} >
            {showResults && 
                <Hits hitComponent={Hit}/>
            }
            </NoResultsBoundary>
          </EmptyQueryBoundary>
      </div>
    </InstantSearch>
  )

}
