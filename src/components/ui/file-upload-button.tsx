import React,{ useState} from "react";

interface ChildProps {
  fileToUpload: (file:File)=>void,
}


export default function FileUploadButton(props:ChildProps) {
  const [ showErrorMessage,setShowErrorMessage] = useState("");
  const [ displayImage,setDisplayImage ] = useState<string>();
 
  const fileHandler = (event:React.ChangeEvent<HTMLInputElement> )=>{
    const fileList = event.target.files; 
    if (fileList!=null){
      const fileSelected = fileList[0]!;  
      const fileExt = fileSelected.type;
      let inValidFileType=true;
      if(fileExt==="image/png" || fileExt==="image/jpeg"){
        inValidFileType=false;
      }
      if (inValidFileType){
        event.target.value="";
        setShowErrorMessage(()=>"Invalid File Type");
        return;
      }
      const imageToDisplay = URL.createObjectURL(fileSelected);
      setDisplayImage(imageToDisplay);
      props.fileToUpload(fileSelected);
    }
  }
  

  return(
    <>
      <div className="mt-4 mb-4 space-y-8 border-b border-gray-900/10 dark:border-gray-900 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
        <input 
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-zinc-700 hover:file:bg-amber-500"
          onChange={(e)=>{ fileHandler(e);}}
          />
      
      </div>
      <div className="mt-4 mb-4 space-y-8 border-b border-gray-900/10 dark:border-gray-900 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0 flex justify-center">
        <img className="max-h-32" src={displayImage} alt=""/>
      </div>
      { showErrorMessage!="" && 
        <section aria-labelledby="section-3-error" className="ml-28">
          <h2 className="sr-only" id="section-1-error">
            an error has occured
          </h2>
          <h2 className="block text-red-500 text-md">
            {showErrorMessage}
          </h2>
        </section>
      }

    </>
  )

}