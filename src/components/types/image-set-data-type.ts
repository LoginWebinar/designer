import { ThumbnailDataType } from "./thumbnail-data-type";
import { AvatarDataType } from "./avatar-data-type";

export type ImageSetDataType = {
  objectID?:string,
  id?:string,
  title:string,
  adType:string[],
  keywords:string[],
  thumbnails: ThumbnailDataType[],
  avatars:AvatarDataType[],
  
  
}