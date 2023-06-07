import React, {useState} from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox,Hits,DynamicWidgets,RefinementList,Menu,Configure,useInstantSearch } from "react-instantsearch-hooks-web";
import ImageSetCard from "../image-set-card/image-set-card";
import { ImageSetDataType } from "../types/image-set-data-type";
import UseGetImageSet from "../image-set-card/components/hooks/use-get-imageset";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const searchClient = algoliasearch("9UVNMIEHAV","2167b0e6a51f8fe71e703075073b52c4");

interface ChildProps {
  selectedImage: (Id:string,data:any) => void;
  createNewImage: ()=>void;
}



export default function AlgoliaDezzieSetSearch(props:ChildProps){
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

  const imageSelection = async(dezziId:string)=>{
    const getImageSet = UseGetImageSet();
    const buildSelectedImage = await getImageSet(dezziId);
    props.selectedImage(dezziId,buildSelectedImage);
  }


  function Hit({ hit }:{hit:any}) {
    const _unknown =hit as unknown;
    const imageCardData = _unknown as ImageSetDataType;
    return (
    <>
      <ImageSetCard imageCardData={imageCardData} onClick={imageSelection} />
    </>
    );
  }

  

  return (
    <InstantSearch searchClient={searchClient} indexName="dezzi_sets" >
      <div className="bg-gray-800 px-6 py-18 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl mr-4">Search for Dezzi Set</h2>
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
            placeholder="Search for Designs"
            searchAsYouType={true}
            classNames={{
              root: 'p-3 shadow-sm w-full',
              form: 'relative',
              input: 'block w-full pl-9 pr-3 py-2 bg-white text-gray-900 border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
              submitIcon: 'absolute top-4 left-0 bottom-0 w-6',
              }}/>
         
        </div>
      </div>
      <div className="w-full grow lg:flex">
        <div className="flex-1 xl:flex">
          <EmptyQueryBoundary fallback={null}>
            <NoResultsBoundary fallback={"No results"} >
            {showResults && 
              <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                <Hits hitComponent={Hit}/>
              </div>
            }
            </NoResultsBoundary>
          </EmptyQueryBoundary>
        </div>
      </div>
    </InstantSearch>
  )

}
