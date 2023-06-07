import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";


export default function ThumbnailCarouselButtons({direction, moveSlide}:{direction:any,moveSlide:any}){
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      {direction === "next" ? <ArrowRightCircleIcon /> : <ArrowLeftCircleIcon />}
    </button>
  );
}