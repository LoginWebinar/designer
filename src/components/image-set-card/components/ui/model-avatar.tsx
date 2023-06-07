import ModelAvatarModal from "./model-avatar-modal";
import { AvatarDataType } from "../../../../components/types/avatar-data-type";


interface ChildProps {
  avatars: AvatarDataType[],
}


export function ModelAvatar (props:ChildProps){
  return(
    <>
      <div className="w-full relative">
        {props.avatars.map((avatar,index) => (
          <div
          key={avatar.id}
          className="rounded-md inline-block"
          >
            <ModelAvatarModal avatarImage={avatar.url.toString()} avatarFace={avatar.faceUrl}  avatarDescription={avatar.description} />
          </div>
        ))}
      </div>
    </>
  )
}