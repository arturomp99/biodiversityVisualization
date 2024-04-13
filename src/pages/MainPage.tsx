import React from "react";
import { paragraphMargin } from "src/data/constants";
import styled from "styled-components";
import { themeSizes } from "src/data/theme";
import { Welcome } from "src/components/homePage/Welcome";

const StyledSection = styled.section<{ color: string }>`
  min-height: 100vh;
  background-color: ${({ color }) => color};
  padding: 0 ${themeSizes.appPaddings.xl};
  overflow: hidden;
`;

const StyledTitle = styled.p`
  margin: ${paragraphMargin} 0;
  font-size: 50px;
  color: white;
  font-weight: bold;
`;

export const MainPage = () => {
  return (
    <div className="absolute top-0 left-0 w-full">
      <Welcome />
      <StyledSection color={"#1a4731"}>
        <StyledTitle>MAIN PAGE</StyledTitle>
      </StyledSection>
      {/*<StyledSection color={themeColors.background.color2}>
        <p>
          Composed of an integrated system of autonomous sensors (sound and
          image) and sampling tools (for eDNA - soil, water and air) called
          DROPs (Deep-Rainforest Observation Platform)
        </p>
        <p>
          The uniqueness of our solution lays, not only in the capability to
          virtually survey any environment (tree canopy, waterways and ground)
          and taxonomic group found in tropical forests, but also in the
          capability of analysing sounds and images in real-time (identifying
          the occurrence of species, anthropogenic events, environmental events,
          and generating bioacoustic indexes) and of remotely sending analysis
          results and data.
        </p>
        <p>
          {`The first layer of our biodiversity monitoring approach involves the
          collection and analysis of eDNA. This method allows the extraction of
          genetic material left behind by organisms in their environment, such
          as skin cells, feces, or mucus. By sampling the surrounding air,
          water, or soil, we can build a catalog of the area's recent
          biodiversity.`}
        </p>
        <p>
          {`The second layer uses bioacoustics to reveal the current conservation status of an habitat by
          not only automatically identifying individual species through the sounds they produce and
          building ecoacoustic indices but also to provide a proxy of the biological activity occurring
          in real-time in the surveyed area.`}
        </p>
        <p>
          {`By combining these disciplines, we
            obtain a more holistic understanding of ecosystem dynamics, of biological communities and
            species behaviour and interactions, species abundance and distribution, bioacoustic trends
            over time and responses to environmental and anthropogenic pressures.`}
        </p>
      </StyledSection>
      <StyledSection color={themeColors.background.color3}>
        <p>{"MISSION PLAN: Add interactive timetable"}</p>
        <p>{"FLIGHTS: Add interactive map pictures and timetable"}</p>
      </StyledSection> */}
    </div>
  );
};
