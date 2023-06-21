"use client";
import {useState, useEffect } from "react";
import FileUploadButton from "@/components/ui/file-upload-button";
import InputField from "@/components/ui/input-field";
import TextAreaField from "@/components/ui/text-area-field";
import { storage } from "@/components/utils/firebase-app";
import { uploadBytes,getDownloadURL,ref } from "firebase/storage";
import { nanoid } from "nanoid";
import UseCreateAvatar from "./components/hooks/use-create-avatar";
import SpinnerForButton from "@/components/spinners/spinner-for-button";

interface ChildProps {
  toggleShow: any;
  docId: (docid:string)=>void;
}

export default function AvatarNewData(props:ChildProps){
  const { toggleShow } = props;
  const [ fullBodyFile,setFullBodyFile] = useState<File | undefined>(undefined);
  const [ faceFile,setFaceFile] = useState<File | undefined>(undefined);
  const [ description,setDescription]=useState("");
  const [ gender,setGender]=useState("");
  const [ dndSecrets,setDndSecrets]=useState("");
  const [ race,setRace]=useState("");
  const [ saveEnabled,setSaveEnabled ] =useState(false);
  const [ uploadedFullBodyURL, setUploadedFullBodyURL] = useState("");
  const [ uploadedFaceURL, setUploadedFaceURL] = useState("");
  const [buttonSpinnerVisible,setButtonSpinnerVisible] = useState(false);

  const createAvatar = UseCreateAvatar()
  
  function saveAvatar(){
    /**
     * save the Images first save the URL into the state
     * 
     */
    setButtonSpinnerVisible(()=>true);
    const uniqueId = nanoid();
    if (fullBodyFile!=undefined){
      const fileName = fullBodyFile.name;     
      const uploadedFileName = uniqueId+"_"+fileName;
      const fullFileLocationAndName = "/protected/avatars/avatars/"+uploadedFileName;
      const fileRef = ref(storage,fullFileLocationAndName);
  
      uploadBytes(fileRef, fullBodyFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async(url) => {
          setUploadedFullBodyURL(()=>url);
        });
      });
    }

    if (faceFile!=undefined){
      const fileName = faceFile.name;
      const uploadedFileName = uniqueId+"_"+fileName;
      const fullFileLocationAndName = "/protected/avatars/faces/"+uploadedFileName;
      const fileRef = ref(storage,fullFileLocationAndName);
  
      uploadBytes(fileRef, faceFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async(url) => {
          setUploadedFaceURL(()=>url);
        });
      });
    } 
  }

  async function saveAvatarToFireStore(){
    /**
       * save the data into the Firestore table
       */
    const x = await createAvatar(description,uploadedFaceURL,uploadedFullBodyURL,dndSecrets,gender,race)
    if (x!=undefined){
      props.docId(x);
    }
    toggleShow();

  }

  useEffect(()=>{
    if (uploadedFullBodyURL!="" && uploadedFaceURL!=""){
      saveAvatarToFireStore();
    }
  },[uploadedFullBodyURL,uploadedFaceURL])

  useEffect(()=>{
    let isDataReady=false;
    let areFilesPresent=false;
    if (gender!="" && dndSecrets!="" && race!="" && description!=""){
      isDataReady=true;
    }
    if (faceFile!=undefined && fullBodyFile!=undefined){
      areFilesPresent=true;
    }
    if (isDataReady && areFilesPresent){
      setSaveEnabled(()=>true);
    }else{
      setSaveEnabled(()=>false);
    }

  },[gender,dndSecrets,race,description,faceFile,fullBodyFile])

  return(
    <>
      <div className="bg-gray-800 p-6 rounded-md text-gray-200">
        <div className="flex justify-between">
          <h2>New Avatar</h2>
          
          <div>
            <button
                type="button"
                className="inline-flex rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                onClick={() => toggleShow()}
            >
                Cancel
            </button>
            
            <button
                type="button"
                disabled={!saveEnabled}
                className="ml-2 inline-flex rounded-md bg-cyan-600 px-2 py-1 text-sm font-semibold text-white shadow-sm enabled:hover:bg-cyan-500 sm:w-auto disabled:opacity-50 disabled:hover:none"
                onClick={() => saveAvatar()}
            >
                <SpinnerForButton show={buttonSpinnerVisible}/> Save
            </button>
          </div>
          
          
        </div>
        
        <div className="mt-2 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextAreaField title="Description of Avatar. Describe the story, clothes, behavior. This is Displayed" value={description} onChange={setDescription} onBlur={setDescription} />
          <TextAreaField title="Secret Keyword Search. This is used by the search engine only" value={dndSecrets} onChange={setDndSecrets} onBlur={setDndSecrets} />
          <InputField title="Gender" value={gender} onChange={setGender} onBlur={setGender} />
          <InputField title="Race" value={race} onChange={setRace} onBlur={setRace} />
        </div>
        <div className="mt-2 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border-2 border-slate-400 border-dotted p-2">
            <h3>Full Body Image</h3>
            <FileUploadButton fileToUpload={setFullBodyFile}/>
          </div>
          <div className="rounded-md border-2 border-slate-400 border-dotted p-2">
            <h3>Face Image</h3>
            <FileUploadButton fileToUpload={setFaceFile} />
          </div>
        </div>
      </div>
    </>
  );
}
