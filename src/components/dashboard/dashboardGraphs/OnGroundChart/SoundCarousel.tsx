import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Audio } from "src/components/shared/AudioPlayer/styles";

export const SoundCarousel = () => {
  return (
    <Carousel
      ariaLabel="collected sound carousel"
      showArrows
      showIndicators
      emulateTouch
      showThumbs={false}
      className="mx-auto w-full max-w-xl"
      infiniteLoop
    >
      <>
        <img className="aspect-video" src="/sampleData/sampleSpectrogram.jpg" />
        <div className="legend bg-slate-600">
          <p>AUDIO 1</p>
          <Audio src="/sampleData/sampleAudio.mp3" controls />
        </div>
      </>
      <>
        <img className="aspect-video" src="/sampleData/sampleSpectrogram.jpg" />
        <div className="legend">
          <p>AUDIO 2</p>
          <Audio src="/sampleData/sampleAudio.mp3" controls />
        </div>
      </>
    </Carousel>
  );
};
