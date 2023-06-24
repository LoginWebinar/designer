
import {ImageAssetLayerDataType} from "@/components/types/image-asset-layer-data-type";

interface ChildProps {
  assetData:ImageAssetLayerDataType|undefined,
}

export default function AssetLayerDataFields(props:ChildProps){

  return(
    <>
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-2">
      <section>
        <img src={props.assetData?.url} alt="asset for this layer" className="w-32" />
      </section>
    </div>
    </>
  );
}