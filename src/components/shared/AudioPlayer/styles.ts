import { audioPlayerAreas } from "src/data/layoutsConstants";
import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledAudioPlayer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "${audioPlayerAreas.spectrogram}"
    "${audioPlayerAreas.displayTrack}";
`;

export const StyledDisplayTrack = styled.div`
  grid-area: ${audioPlayerAreas.displayTrack};
  font-style: bold;
  display: flex;
  justify-content: center;
`;

export const StyledSpectrogram = styled.div`
  grid-area: ${audioPlayerAreas.spectrogram};
  font-size: 1.5rem;
`;

export const Audio = styled.audio`
  width: 100%;
  max-width: 600px;
  outline: none;

  &::-webkit-media-controls-panel {
    background-color: black;
  }

  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-mute-button {
    background-color: #d4d4d8;
    border-radius: 50%;
  }

  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    color: #d4d4d8;
  }

  &::-webkit-media-controls-timeline,
  &::-webkit-media-controls-volume-slider {
    margin-left: ${themeSizes.elementsMargins.sm};
    border-radius: 25px;
    background-color: #d4d4d8;
  }
`;

export const Image = styled.img`
  aspect-ratio: 16/9;
  max-height: 100px;
`;
