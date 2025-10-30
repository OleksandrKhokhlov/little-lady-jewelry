"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./emblaCarouselThumbsButtons";
import Image from "next/image";

type PropType = {
  name?: string;
  slides: Array<{ public_id: string; url: string }>;
  video?: string;
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { name, slides, video, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [errorSlides, setErrorSlides] = useState<Record<number, boolean>>({});
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  const handleImageError = useCallback((index: number) => {
    setErrorSlides((prev) => ({ ...prev, [index]: true }));
  }, []);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container ">
          {slides.map(({ url }, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__image-container w-[80%] mx-auto">
                <Image
                  src={errorSlides[index] || !url ? "/no-photo.png" : url}
                  alt={name || "Зображення відсутне"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => handleImageError(index)}
                  priority={index === 0}
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>
          ))}
          {video && (
            <div className="embla__slide">
              <div className="embla__slide__video-container w-[80%] mx-auto aspect-video">
                <iframe
                  width="290"
                  height="290"
                  src={`https://www.youtube-nocookie.com/embed/${video}?modestbranding=1&rel=0&controls=1&disablekb=1&fs=0&iv_load_policy=3&autoplay=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map(({ url }, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imageUrl={url}
              />
            ))}
            {video && (
              <Thumb
                key="video-thumb"
                onClick={() => onThumbClick(slides.length)}
                selected={selectedIndex === slides.length}
                imageUrl="/poster-video.jpg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
