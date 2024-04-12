import React, { useCallback, useEffect, useState } from "react";
import config from "src/config.json";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardFooter,
  Image,
  Spinner,
} from "@nextui-org/react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useDataContext } from "src/contexts/dataContext";
import { TaxonomicLevelsType } from "src/data/data.types";

export const HeatTree = () => {
  const [taxonLevels, setTaxonLevels] = useState<string[]>([]);
  const [selectedTaxonRank, setSelectedTaxonRank] =
    useState<TaxonomicLevelsType>("Biodiversity");

  const [selectedTaxon, setSelectedTaxon] = useState<string>();

  const { taxonomic } = useDataContext().filtersData;

  useEffect(() => {
    !!taxonomic &&
      setTaxonLevels(() => {
        const taxonomicKeys = Object.keys(taxonomic);
        taxonomicKeys.pop();
        taxonomicKeys.pop();
        return ["Biodiversity", ...taxonomicKeys];
      });
  }, [taxonomic]);

  const rankSelectHandler = useCallback(
    (selectedValue: TaxonomicLevelsType) => {
      setSelectedTaxon(undefined);
      setSelectedTaxonRank(selectedValue);
    },
    []
  );

  const taxonSelectHandler = useCallback((taxon: string) => {
    setSelectedTaxon(taxon);
  }, []);

  const shouldShowImage =
    selectedTaxonRank === "Biodiversity" || !selectedTaxonRank || selectedTaxon;

  return (
    <Card
      isBlurred
      isFooterBlurred
      radius="lg"
      className="border-none bg-background/60"
    >
      <CardBody>
        <TransformWrapper centerZoomedOut centerOnInit initialScale={1}>
          <TransformComponent
            wrapperStyle={{ width: "100%" }}
            contentStyle={{ width: "50%", aspectRatio: "1", maxWidth: "430px" }}
          >
            {shouldShowImage ? (
              <Image
                alt="heat tree"
                src={
                  config.HEATTREE_SERVER +
                  (selectedTaxon && `taxon=${selectedTaxon}`)
                }
                radius="lg"
                removeWrapper
              />
            ) : (
              <Spinner className="w-full" />
            )}
          </TransformComponent>
        </TransformWrapper>
      </CardBody>
      <CardFooter className="justify-center gap-1 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p>Heat tree of</p>
        <Autocomplete
          loading={taxonLevels.length == 0}
          defaultSelectedKey="Biodiversity"
          variant="underlined"
          classNames={{
            base: "w-fit",
          }}
          onSelectionChange={rankSelectHandler}
        >
          {taxonLevels.map((taxonLevel) => (
            <AutocompleteItem key={taxonLevel}>{taxonLevel}</AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          loading={taxonLevels.length == 0}
          isDisabled={
            !selectedTaxonRank || selectedTaxonRank === "Biodiversity"
          }
          variant="underlined"
          classNames={{
            base: "w-fit",
          }}
          onSelectionChange={taxonSelectHandler}
        >
          {taxonomic &&
            selectedTaxonRank &&
            selectedTaxonRank !== "Biodiversity" &&
            taxonomic[selectedTaxonRank].map((taxonLevel) => (
              <AutocompleteItem key={taxonLevel}>{taxonLevel}</AutocompleteItem>
            ))}
        </Autocomplete>
      </CardFooter>
    </Card>
  );
};
