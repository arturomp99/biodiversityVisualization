import React from "react";
import styled from "styled-components";
import { Welcome } from "src/components/homePage/Welcome";
import { Totals } from "src/components/homePage/Totals";
import { Spacer } from "@nextui-org/react";
import { About } from "src/components/homePage/About";

const WelcomeImage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("/assets/homepage_background.jpg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`;

export const MainPage = () => {
  return (
    <div className="absolute top-0 left-0 w-full">
      <WelcomeImage />
      <Welcome />
      <Totals />
      <Spacer y={64} />
      <About />
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
