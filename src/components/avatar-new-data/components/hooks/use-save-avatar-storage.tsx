import { storage } from "@/components/utils/firebase-app";
import { uploadBytes,getDownloadURL,ref } from "firebase/storage";
import { nanoid } from "nanoid";

const UseSaveAvatarStorage = () => { 

  
  const saveFullBodyAvatar = async (fileToSave:File) =>{
    
    const fileName = fileToSave.name;
    const uniqueId = nanoid();
    const uploadedFileName = uniqueId+"_"+fileName;
    const fullFileLocationAndName = "/protected/avatars/avatars/"+uploadedFileName;
    const fileRef = ref(storage,fullFileLocationAndName);
    let uploadedFullBodyURL:string="";

    uploadBytes(fileRef, fileToSave).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async(url) => {
        uploadedFullBodyURL=url;
        return uploadedFullBodyURL;
      });
    });
  }

  return saveFullBodyAvatar;

}

export default UseSaveAvatarStorage;