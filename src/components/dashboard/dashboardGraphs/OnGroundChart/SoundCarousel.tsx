import React from "react";
import config from "src/config.json";
import { Carousel } from "react-responsive-carousel";
import { Audio } from "src/components/shared/AudioPlayer/styles";
import { useFetch } from "src/components/shared/hooks/useReadData/useFetch";

type AudioFetchResponse = {
  segment: string;
  audio: string;
  spectrogram: string;
}[];

export const SoundCarousel = () => {
  const { data: audioData } = useFetch<AudioFetchResponse>(
    config.BACKEND_URL + config.AUDIO_KEY
  );

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
      {audioData?.map((audio) => (
        <>
          <img className="aspect-video" src={audio.spectrogram} />
          <div className="legend bg-slate-600">
            <p>{audio.segment}</p>
            <Audio src={audio.audio} controls />
          </div>
        </>
      ))}
    </Carousel>
  );
};
