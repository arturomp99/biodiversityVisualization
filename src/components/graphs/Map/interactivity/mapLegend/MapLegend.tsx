import React, { FC } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { LegendProps } from "src/components/graphs/shared/Legend/Legend.types";
import { mapChartParameters } from "src/data/constants";
import styled from "styled-components";
import { ScaleSequential } from "d3";

const StyledMapLegendContainer = styled.div`
  display: block;
  position: absolute;
  top: 2rem;
  right: 3rem;
  z-index: 100;
`;

const StyledCheckbox = styled(Checkbox)<{ customColor: string }>`
  & > span {
    color: ${({ customColor }) => customColor};
  }
`;

const StyledDetectionsLabel = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  & > img {
    width: 1rem;
    height: 1rem;
  }
`;

export const MapLegend: FC<
  LegendProps & {
    onValueChange: (
      isSelected: boolean,
      isDronePaths: boolean,
      layerIndex: number
    ) => void;
    colorScale: ScaleSequential<string, never>;
  }
> = ({ keys, colorScale, onValueChange }) => {
  return (
    <StyledMapLegendContainer>
      <Popover>
        <PopoverTrigger>
          <Button color="success" variant="ghost" className="text-black">
            Layers
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <CheckboxGroup defaultValue={[...keys, "detections"]}>
            {keys.map((dataKey, index) => (
              <StyledCheckbox
                color="default"
                customColor={colorScale(index / keys.length)}
                value={dataKey}
                key={index}
                onValueChange={(isSelected: boolean) => {
                  onValueChange(isSelected, true, index);
                }}
              >
                {dataKey}
              </StyledCheckbox>
            ))}
            <Checkbox
              color="default"
              value="detections"
              onValueChange={(isSelected: boolean) => {
                onValueChange(isSelected, false, 0);
              }}
            >
              <StyledDetectionsLabel>
                <img src={mapChartParameters.iconsData.detection.url} />
                Detections
              </StyledDetectionsLabel>
            </Checkbox>
          </CheckboxGroup>
        </PopoverContent>
      </Popover>
    </StyledMapLegendContainer>
  );
};
