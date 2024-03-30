import React, { FC } from "react";
import { getImages } from "../requests/requests";
import { Carousel } from "react-responsive-carousel";

type ImageCarouselProps = {
  images: NonNullable<Awaited<ReturnType<typeof getImages>>["results"]>;
};

export const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel
      ariaLabel="images carousel"
      showArrows
      showIndicators
      emulateTouch
      showThumbs={false}
      className="mx-auto w-full max-w-xl"
    >
      {images.map((image, key) => (
        <div key={key}>
          <img
            alt={image.description || ""}
            src={image.identifier}
            className="aspect-square"
          />
          <p className="legend">{image.description}</p>
        </div>
      ))}
    </Carousel>
  );
};
