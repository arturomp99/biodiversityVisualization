import React from "react";
import { StyledDisplayTrack, Audio } from "./styles";

export const DisplayTrack = () => {
  return (
    <StyledDisplayTrack>
      <Audio src="/sampleData/sampleAudio.mp3" controls />
    </StyledDisplayTrack>
  );
};
