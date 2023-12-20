import { audioPlayerAreas } from "src/data/layoutsConstants";
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
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 150px;
`;
