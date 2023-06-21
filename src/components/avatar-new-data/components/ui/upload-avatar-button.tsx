import { useState,useEffect,useRef,FormEvent} from "react";
import { storage } from "@/components/utils/firebase-app";
import { uploadBytes,getDownloadURL,ref } from "firebase/storage";
import { nanoid } from "nanoid";
// import useUpdateCompanyLogo from "../hooks/use-update-company-logo";

interface ChildProps {
  docId:string,
}

export default function UploadAvatarButton(props:ChildProps) {
  const [ imageUpload,setImageUpload] = useState<File | undefined>(undefined);
  const [ errorMessage,setErrorMessage] = useState("");
  const [ showErrorMessage,setShowErrorMessage] = useState(false);
  const fileUploadRef = useRef(null);
  
  useEffect(()=>{
    if (imageUpload===undefined){
      return;
    }
    // //const UpdateCompanyLogo = useUpdateCompanyLogo();   
    // const fileName = imageUpload.name;
    // const uniqueId = nanoid();
    // const uploadedFileName = uniqueId+"_"+fileName;
    // const fullFileLocationAndName = "/protected/companies/"+props.companyId+"/logos/"+uploadedFileName;
    // const imageRef = ref(storage,fullFileLocationAndName);

    // let uploadedLogoURL:string="";
    // uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then(async(url) => {
    //     uploadedLogoURL=url;
    //     // await UpdateCompanyLogo(fileName,uploadedFileName,uniqueId,url,props.companyId)
    //     // .then(()=>{
    //     //   setImageUpload(()=>{return undefined});
    //     // });
    //   });
    // });

  },[imageUpload])
  
  return (
    <>
      <div className="mt-4 mb-8 space-y-8 border-b border-gray-900/10 dark:border-gray-900 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"></div>
      <form className="form" onSubmit={(event)=>{
        event.preventDefault();
        const target =event.target as HTMLInputElement;
        console.log(target);
        
      }}>
      <section aria-labelledby="section-1-getfile">
        <h2 className="text-white mb-4 ml-4" id="section-1-getfile">Full Body Avatar</h2>

        <label className="block">
          <input 
            type="file"
            ref={fileUploadRef}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-zinc-700 hover:file:bg-amber-500"
            onClick={(e)=>{
              setShowErrorMessage(()=>{return false});
            }}
            />
        </label>
      </section>
      { showErrorMessage && 
        <section aria-labelledby="section-3-error" className="ml-28">
          <h2 className="sr-only" id="section-1-error">
            an error has occured
          </h2>
          <h2 className="block text-red-500 text-md">
            {errorMessage}
          </h2>
        </section>
      }
      
      <section aria-labelledby="section-2-button-upload">
        <h2 className="sr-only" id="section-1-title">
        Upload button
        </h2>
        <button
            type="submit"
            className="inline-flex mt-3 justify-center rounded-xl w-96 bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Upload 
        </button>
      </section>
      
      </form>
    </>

  )
}