import React from "react";

import { StyledAudioPlayer } from "./styles";
import { DisplayTrack } from "./DisplayTrack";
import { Spectrogram } from "./Spectrogram";

export const AudioPlayer = () => {
  return (
    <StyledAudioPlayer>
      <Spectrogram />
      <DisplayTrack />
    </StyledAudioPlayer>
  );
};
