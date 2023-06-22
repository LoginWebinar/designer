import React, {useState} from 'react'
import ThumbnailCarouselButtons from './thumbnail-carousel-buttons';
import { ThumbnailDataType } from '../../../../components/types/thumbnail-data-type';

interface ChildProps {
  thumbnails: ThumbnailDataType[],
}

let numberOfDots = 0;

export function ThumbnailCarousel(props:ChildProps){
  const [slideIndex, setSlideIndex] = useState(1)
  
  const nextSlide = () => {
    if(slideIndex !== props.thumbnails.length){
        setSlideIndex(slideIndex + 1)
    } 
    else if (slideIndex === props.thumbnails.length){
        setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if(slideIndex !== 1){
        setSlideIndex(slideIndex - 1)
    }
    else if (slideIndex === 1){
        setSlideIndex(props.thumbnails.length)
    }
  }

  const moveDot = (index:number) => {
    setSlideIndex(index)
  }
 
  numberOfDots=props.thumbnails.length;
 
  return(
    <>
    <div className="container-slider">
      {props.thumbnails.map((thumbnail,index) => (
        <div
          key={`tn-${thumbnail.id}`}
          className={slideIndex === index + 1 ? "slide active-anim" : "slide relative"}
        >
          <div className="absolute top-0 rounded-lg right-0 bg-black">
            <span className="p-4 text-white z-[10]" >{thumbnail.description}</span>
          </div>
          <img src={thumbnail.url.toString()} alt={thumbnail.description}/>

          <ThumbnailCarouselButtons moveSlide={nextSlide} direction={"next"} />
          <ThumbnailCarouselButtons moveSlide={prevSlide} direction={"prev"} />

          <div className="container-dots">
            {Array.from({length: numberOfDots}).map((item, index) => (
                <div 
                key={index}
                onClick={() => moveDot(index + 1)}
                className={slideIndex === index + 1 ? "dot active" : "dot"}
                ></div>
            ))}
          </div>

        </div>
      ))}
      
    </div>
    </>
  );

}